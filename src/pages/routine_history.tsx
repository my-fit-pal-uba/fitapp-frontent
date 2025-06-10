import "./routine_history.css"

import { useEffect, useState, FormEvent } from "react";
import Header from "../components/header";
import { DevUrl } from "../env/dev.url.model";
import { getToken } from "../Models/token";

async function getRoutineHistory(user_id: number) {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/history/routine_history?user_id=${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    // Ajuste aquí:
    return data.message && data.message[1]?.routine_history
      ? data.message[1].routine_history
      : [];
  } catch (error) {
    console.error("Error fetching routine history:", error);
    return [];
  }
}

async function getRoutineHistoryByDate(user_id: number, date: string) {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/history/routine_history_by_date?user_id=${user_id}&date=${date}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    // Ajuste aquí:
    return data.message && data.message[1]?.routine_history
      ? data.message[1].routine_history
      : [];
  } catch (error) {
    console.error("Error fetching routine history by date:", error);
    return [];
  }
}

function RoutineHistory() {
  const user_id = getToken()?.user_id ?? 0;
  const [history, setHistory] = useState<any[]>([]);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory();
  }, [user_id]);

    const fetchHistory = async () => {
        setError("");
        console.log("user_id:", user_id); // <-- Verifica el user_id
        const data = await getRoutineHistory(user_id);
        console.log("Respuesta historial general:", data); // <-- Verifica la respuesta
        setHistory(Array.isArray(data) ? data : []);
    };

    const handleFilter = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        if (!date) {
            fetchHistory();
            return;
        }
        console.log("user_id:", user_id, "date:", date);
        const data = await getRoutineHistoryByDate(user_id, date);
        console.log("Respuesta historial por fecha:", data);
        setHistory(Array.isArray(data) ? data : []);
        if (!data || (Array.isArray(data) && data.length === 0)) {
        setError("No hay rutinas para esa fecha.");
        }
    };

  return (
    <>
      <Header />
      <div className="routine-history-container">
        <h1>Historial de Rutinas</h1>
        <form onSubmit={handleFilter}>
          <label>
            Filtrar por fecha:{" "}
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </label>
          <button type="submit">Buscar</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {history.length === 0 && !error && <p>No hay historial de rutinas.</p>}
        <ul className="routine-list">
            {history.map((item, idx) => (
                <li key={idx} className="routine-card">
                <strong>Fecha:</strong> {item.done_at}<br />
                <strong>Rutina:</strong> {item.routine?.name}<br />
                <strong>Grupo muscular:</strong> {item.routine?.muscular_group}<br />
                <strong>Series:</strong> {item.routine?.series}<br />
                <strong>Ejercicios:</strong>
                    <ul>
                        {item.routine?.exercises?.map((ex: any) => (
                        <li key={ex.exercise_id}>
                            {ex.name} ({ex.muscular_group})
                        </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default RoutineHistory;