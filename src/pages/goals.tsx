import "./goals.css"

import { useState, useEffect, FormEvent } from 'react';
import Chart from '../components/bar';
import { ChartValue } from '../Models/chartValues';
import Header from "../components/header";
import { getToken } from '../Models/token';
import { User } from '../Models/user';

const mockFetchGoalHistory = async (user_id: number): Promise<ChartValue[]> => {
    const today = new Date();
    const values: ChartValue[] = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        values.push({
            name: date.toISOString().split('T')[0], // 'YYYY-MM-DD'
            value: 70 + Math.floor(Math.random() * 6) // valor aleatorio entre 70 y 75
        });
    }

    return values;
};

const GoalsPage = () => {
    const [currentGoal, setCurrentGoal] = useState<number>(72);
    const [newGoal, setNewGoal] = useState<string>('');
    const [goal, setGoal] = useState("");
    const [error, setError] = useState("");

    const handleGoalUpdate = async () => {
        const parsedGoal = parseFloat(goal);
        const user: User | null = getToken();
        const user_id = user?.user_id
        if (!isNaN(parsedGoal)) {
            try {
                const response = await fetch("http://127.0.0.1:8080/goals/register", {
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

                setCurrentGoal(parsedGoal); // actualiza el número mostrado
                setGoal(""); // limpia input
            } catch (err) {
                setError("No se pudo guardar el objetivo");
                console.error(err);
            }
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");
    };

    return (
        <>
            <Header />
            <div className="goals-container">
                <h1 style={{ color: "white" }}>Mis Objetivos</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Tarjeta de objetivo actual */}
                    <div className="bg-white rounded-2xl shadow p-6">

                        <h3 className="text-xl font-semibold mb-4">Objetivo actual: {currentGoal}kg</h3>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Nuevo objetivo..."
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)} />
                            <button
                                onClick={handleGoalUpdate}
                                className="submit"
                            >
                                Actualizar
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h3 className="text-xl font-semibold mb-4">Historial Objetivos de Peso</h3>
                        <Chart chartType="line" fetchData={mockFetchGoalHistory} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GoalsPage;