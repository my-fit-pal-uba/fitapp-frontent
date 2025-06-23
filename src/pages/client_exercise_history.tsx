import "./routine_history.css";
import { useEffect, useState, FormEvent } from "react";
import Header from "../components/header";
import { DevUrl } from "../env/dev.url.model";
import { useParams } from "react-router";

async function getExerciseHistoryByClient(clientId: number) {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/exercises/series?user_id=${clientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return [];

    const data = await response.json();
    return data.message && data.message[1]?.series ? data.message[1].series : [];
  } catch (error) {
    console.error("Error fetching exercise history:", error);
    return [];
  }
}

async function getExerciseHistoryByDate(clientId: number, date: string) {
  try {
    // Asumo que no tenés endpoint separado para filtro por fecha, así que filtramos en el frontend
    const allSeries = await getExerciseHistoryByClient(clientId);
    return allSeries.filter((s: any) => s.created_at.startsWith(date));
  } catch (error) {
    console.error("Error fetching exercise history by date:", error);
    return [];
  }
}

function ClientExerciseHistory() {
  const { clientId } = useParams<{ clientId: string }>();
  const numericClientId = parseInt(clientId ?? "0", 10);

  const [series, setSeries] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory();
  }, [numericClientId]);

  const fetchHistory = async () => {
    setError("");
    const data = await getExerciseHistoryByClient(numericClientId);
    setSeries(Array.isArray(data) ? data : []);
    setFiltered(Array.isArray(data) ? data : []);
  };

  const handleFilter = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!date) {
      setFiltered(series);
      return;
    }
    const filteredSeries = series.filter((s) => s.created_at.startsWith(date));
    if (filteredSeries.length === 0) {
      setError("No hay ejercicios para esa fecha.");
    }
    setFiltered(filteredSeries);
  };

  return (
    <>
      <Header />
      <div className="routine-history-container">
        <h1 style={{ color: "white" }}>Historial de Ejercicios del Cliente</h1>
        <form className="filter-form" onSubmit={handleFilter}>
          <label>
            Filtrar por fecha:{" "}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <button type="submit">Buscar</button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {filtered.length === 0 && !error && <p>No hay historial de ejercicios.</p>}

        <ul className="routine-list">
          {filtered.map((s, idx) => (
            <li key={idx} className="routine-card">
              <p><strong>Ejercicio:</strong> {s.exercise_name}</p>
              <p><strong>Repeticiones:</strong> {s.repetitions}</p>
              <p><strong>Peso:</strong> {s.weight} kg</p>
              <p><strong>Fecha:</strong> {new Date(s.created_at).toLocaleString("es-AR")}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ClientExerciseHistory;