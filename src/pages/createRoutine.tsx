import "./createRoutine.css"

import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router";
import Header from "../components/header";
import { Exercise } from "../Models/exercise";
import { DevUrl } from "../env/dev.url.model";

const TYPES = ["Bodyweight", "Weightlifting", "Cardio", "Flexibility", "Machine", "Sport", "Isometric"];
const PLACES = ["Gym", "Home", "Outdoor"];
const MUSCULAR_GROUPS = ["Chest", "Back", "Legs", "Arms", "Shoulders", "Core"];

function CreateRoutine() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [muscularGroup, setMuscularGroup] = useState("");
    const [series, setSeries] = useState(1);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
    const [error, setError] = useState("");
    const [type, setType] = useState("");
    const [place, setPlace] = useState("");
    const [filterMuscularGroup, setFilterMuscularGroup] = useState("");
    const navigate = useNavigate();

    const fetchExercises = async () => {
        let url = "";
        let param = "";

        if (type) {
            url = `${DevUrl.baseUrl}/exercises/filter_by_type`;
            param = `type=${encodeURIComponent(type)}`;
        } else if (place) {
            url = `${DevUrl.baseUrl}/exercises/filter_by_place`;
            param = `place=${encodeURIComponent(place)}`;
        } else if (filterMuscularGroup) {
            url = `${DevUrl.baseUrl}/exercises/filter_by_muscular_group`;
            param = `muscular_group=${encodeURIComponent(filterMuscularGroup)}`;
        } else {
            url = `${DevUrl.baseUrl}/exercises/all`;
        }

        const fullUrl = param ? `${url}?${param}` : url;
        try {
            const response = await fetch(fullUrl, {
                method: "GET",
                headers: { Accept: "application/json" },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los ejercicios");
            }

            const data = await response.json();
            const exercises = Array.isArray(data.message) && data.message[1]?.exercises;

            setExercises(exercises || []);
        } catch {
            setExercises([]);
        }
    };

    useEffect(() => {
        fetchExercises();
    }, [type, place, filterMuscularGroup]);

    const handleCheckboxChange = (exerciseId: number) => {
        setSelectedExercises((prev) =>
            prev.includes(exerciseId)
                ? prev.filter((id) => id !== exerciseId)
                : [...prev, exerciseId]
        );
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        if (!name || !description || !muscularGroup || !series || selectedExercises.length === 0) {
            setError("Completa todos los campos y selecciona al menos un ejercicio.");
            return;
        }
        const routineData = {
            name,
            description,
            muscular_group: muscularGroup,
            series: Number(series),
            exercises: selectedExercises.map((id) => ({ exercise_id: id })),
        };
        try {
            const response = await fetch(`${DevUrl.baseUrl}/routines/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(routineData),
            });
            if (!response.ok) throw new Error("Error al crear la rutina");
            navigate("/routines");
        } catch {
            setError("Error al crear la rutina");
        }
    };

    return (
        <>
            <Header />
            <div className="create-routine-container">
                <h1>Crear Rutina</h1>
                <form className="filter-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Grupo muscular"
                        value={muscularGroup}
                        onChange={e => setMuscularGroup(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Series"
                        value={series}
                        min={1}
                        onChange={e => setSeries(Number(e.target.value))}
                    />
                    <button type="submit">Crear Rutina</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
                <h2 style={{ color: 'white' }}>Selecciona ejercicios para la rutina</h2>
                <form className="filter-form" style={{ marginBottom: "1rem" }}>
                    <div className="filter-group">
                        <label htmlFor="type">Tipo:</label>
                        <select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Todos</option>
                            {TYPES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="place">Lugar:</label>
                        <select
                            id="place"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                        >
                            <option value="">Todos</option>
                            {PLACES.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="muscularGroup">Grupo muscular:</label>
                        <select
                            id="muscularGroup"
                            value={filterMuscularGroup}
                            onChange={(e) => setFilterMuscularGroup(e.target.value)}
                        >
                            <option value="">Todos</option>
                            {MUSCULAR_GROUPS.map((mg) => (
                                <option key={mg} value={mg}>{mg}</option>
                            ))}
                        </select>
                    </div>
                </form>
                <div className="exercises-list">
                    {exercises.length > 0 ? (
                        exercises.map((exercise) => (
                            <div key={exercise.exercise_id} className="exercise-card">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={exercise.exercise_id !== undefined && selectedExercises.includes(exercise.exercise_id)}
                                        onChange={() => {
                                            if (exercise.exercise_id !== undefined) {
                                                handleCheckboxChange(exercise.exercise_id);
                                            }
                                        }}
                                    />
                                    <strong>{exercise.name}</strong> - {exercise.muscular_group} ({exercise.type})
                                </label>
                                <p>{exercise.description}</p>
                                {exercise.photo_guide && (
                                    <img src={exercise.photo_guide} alt={`${exercise.name} guía`} />
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No hay ejercicios para mostrar.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default CreateRoutine;