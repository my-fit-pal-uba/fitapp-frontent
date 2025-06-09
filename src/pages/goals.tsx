import "./goals.css"

import { useState, useEffect, FormEvent } from 'react';
import Chart from '../components/bar';
import { ChartValue } from '../Models/chartValues';
import Header from "../components/header";

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

    const handleGoalUpdate = () => {
        const parsedGoal = parseFloat(newGoal);
        if (!isNaN(parsedGoal)) {
            setCurrentGoal(parsedGoal);
            // Aquí podrías hacer un fetch PUT o POST para persistirlo
            setNewGoal('');
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