import { useParams, useLocation } from 'react-router';
import { useEffect, useState, FormEvent, JSX } from "react";
import { DevUrl } from "../env/dev.url.model";
import { Exercise } from "../Models/exercise";
import { Serie } from "../Models/serie.ts";
import Header from "../components/header";
import { useNavigate } from 'react-router';
import { User } from '../Models/user';
import { getToken } from '../Models/token';
import './do_exercises.css';

function RealizarEjercicio() {
  const navigate = useNavigate();
  const user: User | null = getToken();
  const { id } = useParams();
  const location = useLocation();
  const { exercise: locationExercise } = location.state || {};

  const [exercise, setExercise] = useState<Exercise | null>(locationExercise || null);
  const [loading, setLoading] = useState<boolean>(!locationExercise);

  const [series, setSeries] = useState<Serie[]>([]);

  const [repetitionsInput, setRepetitionsInput] = useState('');
  const [weightInput, setWeightInput] = useState('');

  useEffect(() => {
    if (!exercise && id) {
        fetch(`${DevUrl}/exercises/${id}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setExercise(data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Error al cargar ejercicio:', err);
            setLoading(false);
        });
    }
  }, [exercise, id]);

  const addSerie = (e: FormEvent) => {
    e.preventDefault();

    const repetitions = parseInt(repetitionsInput);
    const weight = parseFloat(weightInput);

    if (isNaN(repetitions) || isNaN(weight)) {
      alert('Por favor, ingresa valores válidos para repeticiones y peso.');
      return;
    }

    const nuevaSerie: Serie = {
      repetitions,
      weight,
    };

    setSeries([...series, nuevaSerie]);
    setRepetitionsInput('');
    setWeightInput('');
  };

  const handleSubmitSeries = async () => {
    const user_id = user?.user_id;
    const exercise_id = exercise?.exercise_id;
    let url = `${DevUrl.baseUrl}/exercises/register_series?user_id=${user_id}&exercise_id=${exercise_id}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ series }),
      });
      if (!response.ok) {
        throw new Error('Error al registrar las series');
        navigate('/exercises')
      }
      alert(`Series registradas exitosamente`)
      navigate('/exercises')
    } catch (error) {
      console.error('Error al enviar las series:', error);
      alert('Error al registrar las series. Por favor, inténtalo de nuevo.');
    }
    setSeries([]); // Limpiar las series después de enviar
    setRepetitionsInput('');
    setWeightInput('');
  };

  if (loading) return <p>Cargando ejercicio...</p>;
  if (!exercise) return <p>No se encontró el ejercicio.</p>;

  return (
    <>
      <Header />
      <div>
        <h1>{exercise.name}</h1>
        <p>{exercise.description}</p>
      </div>

      <div>
        <h2>Agregar series</h2>
        <form onSubmit={addSerie} className="formSerieContainer">
          <input
            type="number"
            placeholder="Repeticiones"
            value={repetitionsInput}
            onChange={(e) => setRepetitionsInput(e.target.value)}
            className="inputSerie"
            min={0}
            required
          />
          <input
            type="float"
            placeholder="Peso (kg)"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            className="inputSerie"
            min={0}
            step="0.1"
            required
          />
          <button type="submit" className="botonAgregar">Agregar Serie</button>
        </form>

        <table border={1} cellPadding={5} style={{ width: '100%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Repeticiones</th>
              <th>Peso (kg)</th>
            </tr>
          </thead>
          <tbody>
            {series.length === 0 ? (
              <tr>
                <td colSpan={3}>No hay series agregadas</td>
              </tr>
            ) : (
              series.map((serie, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{serie.repetitions}</td>
                  <td>{serie.weight}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <button className="botonEnviar" onClick={handleSubmitSeries}>
            Confirmar Series
        </button>
      </div>
    </>
  );
}

export default RealizarEjercicio;