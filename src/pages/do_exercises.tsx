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

  const [repsInput, setRepsInput] = useState('');
  const [weightInput, setWeightInput] = useState('');

  useEffect(() => {
    console.log("ID del ejercicio:", id);
    if (!exercise && id) {
        fetch(`${DevUrl}/exercises/${id}`)
        .then(res => {
            console.log("Respuesta fetch status:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("Datos recibidos:", data);
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

    const reps = parseInt(repsInput);
    const weight = parseFloat(weightInput);

    if (isNaN(reps) || isNaN(weight)) {
      alert('Por favor, ingresa valores válidos para repeticiones y peso.');
      return;
    }

    const nuevaSerie: Serie = {
      user_id: user?.user_id || 0,
      exercise_id: exercise?.exercise_id || 0,
      reps,
      weight,
    };

    setSeries([...series, nuevaSerie]);
    setRepsInput('');
    setWeightInput('');
  };

  const handleSubmitSeries = () => {
    alert(`Series registradas exitosamente`)
    navigate('/exercises')
    /*console.log("Series a enviar:", JSON.stringify(series, null, 2));*/
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
            value={repsInput}
            onChange={(e) => setRepsInput(e.target.value)}
            className="inputSerie"
            min={0}
            required
          />
          <input
            type="number"
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
                  <td>{serie.reps}</td>
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