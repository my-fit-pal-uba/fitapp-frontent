import "./routines.css"

import { useEffect, useState, FormEvent, JSX } from "react";
import { useNavigate } from 'react-router';
import { DevUrl } from "../env/dev.url.model";
import { Routine } from "../Models/routine";
import Header from "../components/header";
import RoutineCard from "../components/routine_card";
import { RoutineRating } from "../Models/routine_rating";
import { User } from '../Models/user';
import { getToken } from '../Models/token';

function Routines(): JSX.Element {
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [error, setError] = useState("");
	const [search, setSearch] = useState("");
    const [series, setSeries] = useState("");
    const [userRatings, setUserRatings] = useState<{ [key: number]: number }>({});
    const [averageRatings, setAverageRatings] = useState<{ [key: number]: number }>({});
    const user: User | null = getToken();
    const [message, setMessage] = useState<string | null>(null);

    const navigate = useNavigate();

        const fetchRatings = async () => {
            try {
                const res = await fetch(`${DevUrl.baseUrl}/routines/ratings?user_id=${user?.user_id}`);
                const data = await res.json();
                const ratings = data.message.reduce((acc: Record<number, number>, item: RoutineRating) => {
                    acc[item.routine_id] = parseFloat(item.rating.toString());
                    return acc;
                }, {});
                setUserRatings(ratings);
            } catch (error) {
                console.error("Error fetching ratings:", error);
            }
        };
    
	const fetchAverageRatings = async () => {
		try {
			const res = await fetch(`${DevUrl.baseUrl}/routines/average-ratings`);
			const data = await res.json();
			const averages = data.message.reduce((acc: Record<number, number>, item: any) => {
				acc[item.routine_id] = parseFloat(item.average_rating.toString());
				return acc;
			}, {});
			setAverageRatings(averages);
		} catch (error) {
			console.error("Error fetching average ratings:", error);
		}
	};


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
		fetchRatings();
		fetchAverageRatings();
	}, []);

    return (
        <> 
        <Header />
        {message && <div className="flash-message">{message}</div>}
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
                    {routines.map((routine) => {
                        return (
                            <RoutineCard
                                key={routine.routine_id}
                                routine={routine}
                                onClick={async () => {
                                            const res = await fetch(`${DevUrl.baseUrl}/routines/register?user_id=${user?.user_id}&routine_id=${routine.routine_id}`, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                }
                                            })
                                        if (!res.ok) {
                                            setMessage("Error al registrar la rutina");
                                            setTimeout(() => setMessage(null), 3000);
                                        }
                                        setMessage("¡Rutina registrada exitosamente!");
                                        setTimeout(() => setMessage(null), 3000);
                                    }
                                }
                                averageRating={averageRatings[routine.routine_id] ?? 0}
                                initialUserRating={userRatings[routine.routine_id] ?? 0}
                            />	
                        );			
                    })}
                </ul>
            </div>
        </>
    )
}


export default Routines;