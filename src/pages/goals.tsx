import "./goals.css"

import { useState, useEffect, FormEvent } from 'react';
import Chart from '../components/bar';
import { ChartValue } from '../Models/chartValues';
import Header from "../components/header";
import { getToken } from '../Models/token';
import { User } from '../Models/user';
import { DevUrl } from "../env/dev.url.model";

const fetchGoalHistory = async (user_id: number): Promise<ChartValue[]> => {
    try {
        const response = await fetch(`${DevUrl.baseUrl}/goals/history?user_id=${user_id}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("No se pudo obtener el historial de objetivos");
        }

        const json = await response.json();

        const historyArray = json.message?.data ?? [];

        const chartData: ChartValue[] = historyArray.map((item: any) => {
            const date = new Date(item.registered_at);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");

            return {
                name: `${year}-${month}-${day}`,
                value: parseFloat(item.goal_value),
            };
        });

        return chartData;
    } catch (error) {
        console.error("Error al obtener historial de objetivos:", error);
        return [];
    }
};

const GoalsPage = () => {
    const [currentGoal, setCurrentGoal] = useState<number>(72);
    const [newGoal, setNewGoal] = useState<string>('');
    const [goal, setGoal] = useState("");
    const [error, setError] = useState("");
    const user: User | null = getToken();
    const [message, setMessage] = useState<string | null>(null); // <-- mensaje de feedback

    const handleGoalUpdate = async () => {
        const parsedGoal = parseFloat(goal);
        const user: User | null = getToken();
        const user_id = user?.user_id
        if (!isNaN(parsedGoal)) {
            try {
                const response = await fetch(`${DevUrl.baseUrl}/goals/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "accept": "application/json",
                    },
                    body: JSON.stringify({
                        goal_value: parsedGoal,
                        user_id: user_id,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Error al guardar el objetivo");
                }

                setCurrentGoal(parsedGoal); 
                setGoal(""); 
                setError("");
                setMessage("¡Objetivo actualizado con éxito!");
                setTimeout(() => setMessage(null), 3000);
            } catch (err) {
                setError("No se pudo guardar el objetivo");
                setMessage("No se pudo guardar el objetivo");
                console.error(err);
                setTimeout(() => setMessage(null), 3000);
            }
        } else {
            setError("Por favor ingresa un valor numérico válido");
            setMessage("Por favor ingresa un valor numérico válido");
            setMessage(null);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    useEffect(() => {
        const fetchCurrentGoal = async () => {
            const user: User | null = getToken();
            const user_id = user?.user_id;

            if (!user_id) {
                setError("Usuario no identificado");
                return;
            }

            try {
                const response = await fetch(`${DevUrl.baseUrl}/goals/current?user_id=${user_id}`, {
                    method: "GET",
                    headers: {
                        "accept": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al obtener el objetivo actual");
                }

                const data = await response.json();
                const goalValue = parseFloat(data.message.goal_value);
                if (!isNaN(goalValue)) {
                    setCurrentGoal(goalValue);
                } else {
                    setError("Objetivo inválido recibido");
                }
            } catch (err) {
                setError("No se pudo cargar el objetivo actual");
                console.error(err);
            }
        };



        fetchCurrentGoal();
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");
    };

    return (
        <>
            
            <Header />
            {message && <div className="flash-message">{message}</div>}
            <div className="goals-container">
                <h1 style={{ color: "white" }}>Mis Objetivos</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Tarjeta de objetivo actual */}
                    <div className="bg-white rounded-2xl shadow p-6">

                        <h3 className="text-xl font-semibold mb-4">Objetivo actual: {currentGoal}kg</h3>
                        <div className="flex items-center gap-2  w-full">
                            <input
                                type="text"
                                placeholder="Nuevo objetivo..."
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                className="w-1/2 border border-gray-300 rounded px-3 py-2" />
                            <button
                                onClick={handleGoalUpdate}
                                className="submit px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Actualizar
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h3 className="text-xl font-semibold mb-4">Historial Objetivos de Peso</h3>
                        <Chart chartType="line" fetchData={() => fetchGoalHistory(user?.user_id ?? 0)} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GoalsPage;