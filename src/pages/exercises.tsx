import "./exercises.css"

import { useEffect, useState, FormEvent, JSX } from "react";
import { DevUrl } from "../env/dev.url.model";
import { Exercise } from "../Models/exercise";
import { ExerciseRating } from "../Models/exercise_rating";
import Header from "../components/header";
import ExerciseCard from "../components/exercise_card";
import { useNavigate } from 'react-router';
import { getToken } from '../Models/token';
import { User } from '../Models/user';

const TYPES = ["Bodyweight", "Weightlifting", "Cardio", "Flexibility", "Machine", "Sport", "Isometric"];
const PLACES = ["Gym", "Home", "Outdoor"];
const MUSCULAR_GROUPS = ["Chest", "Back", "Legs", "Arms", "Shoulders", "Core"];

function Exercises(): JSX.Element {
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [type, setType] = useState("");
	const [place, setPlace] = useState("");
	const [muscularGroup, setMuscularGroup] = useState("");
	const [error, setError] = useState("");
	const [search, setSearch] = useState("");
	const [userRatings, setUserRatings] = useState<{ [key: number]: number }>({});
	const [averageRatings, setAverageRatings] = useState<{ [key: number]: number }>({});
	const user: User | null = getToken();

	const fetchRatings = async () => {
		try {
			const res = await fetch(`${DevUrl.baseUrl}/exercises/ratings?user_id=${user?.user_id}`);
			const data = await res.json();
			const ratings = data.message.reduce((acc: Record<number, number>, item: ExerciseRating) => {
				acc[item.exercise_id] = parseFloat(item.rating.toString());
				return acc;
			}, {});
			setUserRatings(ratings);
		} catch (error) {
			console.error("Error fetching ratings:", error);
		}
	};

	const fetchAverageRatings = async () => {
		try {
			const res = await fetch(`${DevUrl.baseUrl}/exercises/average-ratings`);
			const data = await res.json();
			const averages = data.message.reduce((acc: Record<number, number>, item: any) => {
				acc[item.exercise_id] = parseFloat(item.average_rating.toString());
				return acc;
			}, {});
			setAverageRatings(averages);
		} catch (error) {
			console.error("Error fetching average ratings:", error);
		}
	};

	const fetchExercises = async () => {
		let url = "";
		let param = "";

		if (search) {
			url = `${DevUrl.baseUrl}/exercises/search`;
			param = `name=${encodeURIComponent(search)}`;
		} else if (type) {
			url = `${DevUrl.baseUrl}/exercises/filter_by_type`;
			param = `type=${encodeURIComponent(type)}`;
		} else if (place) {
			url = `${DevUrl.baseUrl}/exercises/filter_by_place`;
			param = `place=${encodeURIComponent(place)}`;
		} else if (muscularGroup) {
			url = `${DevUrl.baseUrl}/exercises/filter_by_muscular_group`;
			param = `muscular_group=${encodeURIComponent(muscularGroup)}`;
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


			if (!exercises || exercises.length === 0) {
				throw new Error("No se encontraron ejercicios");
			}
			setExercises(exercises);
			setError("");
		} catch (err) {
			setError("No se pudieron obtener los ejercicios. Por favor, inténtalo de nuevo más tarde.");
			setExercises([]);
		}
	};

	const handleFilter = (e: FormEvent) => {
		e.preventDefault();
		setError("");
		fetchExercises();
	};

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();
		setError("");
		fetchExercises();
	};



	useEffect(() => {
		fetchExercises();
		fetchRatings();
		fetchAverageRatings();
	}, []);

	const navigate = useNavigate();

	return (
		<>
		<Header /><div className="exercises-container">

			<h1 style={{ color: "white" }}>Ejercicios</h1>
			<form
				onSubmit={handleSearch}
				className="search-form"
				style={{ marginBottom: "1rem" }}
			>
				<input
					type="text"
					placeholder="Buscar por nombre..."
					value={search}
					onChange={(e) => setSearch(e.target.value)} />
				<button type="submit">Buscar</button>
			</form>
			<form
				onSubmit={handleFilter}
				className="filter-form"
			>
				<div className="filter-group">
					<label htmlFor="type">Tipo:</label>
					<select
						id="type"
						value={type}
						onChange={(e) => setType(e.target.value)}
					>
						<option value="">Todos</option>
						{TYPES.map((t) => (
							<option
								key={t}
								value={t}
							>
								{t}
							</option>
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
							<option
								key={p}
								value={p}
							>
								{p}
							</option>
						))}
					</select>
				</div>
				<div className="filter-group">
					<label htmlFor="muscularGroup">Grupo muscular:</label>
					<select
						id="muscularGroup"
						value={muscularGroup}
						onChange={(e) => setMuscularGroup(e.target.value)}
					>
						<option value="">Todos</option>
						{MUSCULAR_GROUPS.map((mg) => (
							<option
								key={mg}
								value={mg}
							>
								{mg}
							</option>
						))}
					</select>
				</div>
				<button type="submit">Filtrar</button>
			</form>
			{error && <div className="error-message">{error}</div>}
			<div className="exercises-list">
				{exercises.length > 0 ? (
					console.log(user?.rol),
					exercises.map((exercise) => {
						return (
						<div key={exercise.exercise_id} style={{ position: "relative" }}>
							<ExerciseCard
							exercise={exercise}
							onClick={() =>
								navigate(`/realizar/${exercise.exercise_id}`, { state: { exercise } })
							}
							averageRating={averageRatings[exercise.exercise_id] ?? 0}
							initialUserRating={userRatings[exercise.exercise_id] ?? 0}
							/>
						</div>
						);
					})
					) : null}
			</div>
		</div></>
	);
}

export default Exercises;
