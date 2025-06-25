import "./shared.css";

import { useEffect, useState } from "react";
import { DevUrl } from "../env/dev.url.model";
import { getToken } from "../Models/token";
import Header from "../components/header";
import { Dish } from "../Models/dish";
import { Exercise } from "../Models/exercise";
import NutritionTable from "../components/nutritiontable";
import ExerciseCard from "../components/exercise_card";
import { useNavigate } from "react-router";

const SharedItems = () => {
  const user = getToken();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchShared = async () => {
      try {
        const [dishesRes, exercisesRes] = await Promise.all([
          fetch(`${DevUrl.baseUrl}/trainer/client_dishes?client_id=${user?.user_id}`),
          fetch(`${DevUrl.baseUrl}/trainer/client_exercises?client_id=${user?.user_id}`),
        ]);
        const dishesData = await dishesRes.json();
        const exercisesData = await exercisesRes.json();

        const mappedDishes = (dishesData.message || dishesData || []).map((dish: any) => ({
          id: dish.id,
          name: dish.name,
          description: dish.description,
          calories: dish.calories,
          carbs: dish.carbs,
          fats: dish.fat, 
          proteins: dish.proteins,
          weight: dish.weight_in_g,
          id_dish_category: dish.id_dish_category || [],
        }));

        const mappedExercises = (exercisesData.message || exercisesData || []).map((ex: any) => ({
          exercise_id: ex.exercise_id,
          name: ex.name,
          description: ex.description,
          muscular_group: ex.muscular_group,
          type: ex.type,
          place: ex.place,
          photo_guide: ex.photo_guide,
          video_guide: ex.video_guide,
        }));

        setDishes(mappedDishes || []);
        setExercises(mappedExercises || []);
      } catch (e) {
        setDishes([]);
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };
    fetchShared();
  }, []);

  return (
    <>
      <Header />
      <div className="shared-items-container">
        <h1>Alimentos y ejercicios que te compartió tu entrenador</h1>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <section>
              <h2>Alimentos</h2>
              {dishes.length === 0 ? (
                <p>No tienes alimentos compartidos.</p>
              ) : (
                <NutritionTable
                  data={dishes}
                  onAddToMeal={() => {}} // Puedes dejarlo vacío o mostrar un modal si quieres permitir registrar consumo
                />
              )}
            </section>
            <section>
              <h2>Ejercicios</h2>
              {exercises.length === 0 ? (
                <p>No tienes ejercicios compartidos.</p>
              ) : (
                <div className="exercises-list">
                  {exercises.map((exercise) => (
                    <div key={exercise.exercise_id} style={{ marginBottom: "2rem" }}>
                      <ExerciseCard
                        exercise={exercise}
                        onClick={() =>
                          navigate(`/realizar/${exercise.exercise_id}`, { state: { exercise } })
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default SharedItems;