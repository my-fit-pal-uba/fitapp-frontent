import "./routines.css"

import { useEffect, useState, FormEvent, JSX } from "react";
import { useNavigate } from 'react-router';
import { DevUrl } from "../env/dev.url.model";
import { Routine } from "../Models/routine";
import Header from "../components/header";

function Routines(): JSX.Element {
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [error, setError] = useState("");
	const [search, setSearch] = useState("");
    const [series, setSeries] = useState("");

    const navigate = useNavigate();

    const fetchRoutines = async () => {
        let url = "";
        let param = "";

        if (search) {
            url = `${DevUrl.baseUrl}/routines/search`;
            param = `name=${encodeURIComponent(search)}`;
        } else if (series){
            url = `${DevUrl.baseUrl}/routines/filter_by_series`;
			param = `series=${encodeURIComponent(series)}`;
        } else {
            url = `${DevUrl.baseUrl}/routines/all`;
        }
        
        const fullUrl = param ? `${url}?${param}` : url;
        
        try {
            const response = await fetch(fullUrl, {
                method: "GET",
                headers: { Accept: "application/json" },
            });

            if (!response.ok) {
                throw new Error("Error al obtener las rutinas");
            }

            const data = await response.json();
            const routines = Array.isArray(data.message) && data.message[1]?.routines;

            if (!routines || routines.length === 0) {
                throw new Error("No se encontraron rutinas");
            }
            setRoutines(routines);
            setError("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
            setRoutines([]);
        }
    }
    const handleFilter = (e: FormEvent) => {
		e.preventDefault();
		setError("");
		fetchRoutines();
	};

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();
		setError("");
		fetchRoutines();
	};

	useEffect(() => {
		fetchRoutines();
	}, []);

    return (
        <>
        <Header />
            <div className="routines-container">
                <h1>Rutinas</h1>
                <button onClick={() => navigate("/routines/create")}>
                    Crear Rutina
                </button>
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Buscar rutina por nombre"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>
                <form onSubmit={handleFilter} className="filter-form">
                    <input
                        type="number"
                        placeholder="Filtrar por series"
                        value={series}
                        onChange={(e) => setSeries(e.target.value)}
                    />
                    <button type="submit">Filtrar</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <ul className="routines-list">
                    {routines.map((routine) => (
                        <li key={routine.routine_id}>
                            <h2>{routine.name}</h2>
                            <p>{routine.description}</p>
                            <p>Grupo muscular: {routine.muscular_group}</p>
                            <p>Series: {routine.series}</p>
                            <ul>
                                {routine.exercises.map((exercise, index) => (
                                    <li key={index}>{exercise.name}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}


export default Routines;