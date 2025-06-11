import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { addDish } from "../services/diets.services";
import { DevUrl } from "../env/dev.url.model";
import { Dish } from "../Models/dish";
import './add_dish_to_diet.css';

const AddDishToDiet = () => {
  const { dietId } = useParams();
  const navigate = useNavigate();

  const [dishId, setDishId] = useState("");
  const [mealCategoryId, setMealCategoryId] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [mealCategories, setMealCategories] = useState<{ id: number; description: string }[]>([]);

  const fetchMealCategories = async () => {
    try {
      const response = await fetch(`${DevUrl.baseUrl}/nutrition/get_meal_categories`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las categorías");
      }

      const data = await response.json();
      const categories = Array.isArray(data.message) ? data.message : [];
      setMealCategories(categories);
    } catch {
      setMealCategories([]);
      
    }
  };

  const fetchDishes = async () => {
    try {
      const response = await fetch(`${DevUrl.baseUrl}/nutrition/get_dishes`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los platos");
      }

      const data = await response.json();
      const dishes = Array.isArray(data.message) ? data.message : [];
      setDishes(dishes);
    } catch {
      setDishes([]);
    }
  };

  useEffect(() => {
    fetchDishes();
    fetchMealCategories();
  }, []);

  const selectedDish = dishes.find((d) => d.id === Number(dishId));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!dishId || !mealCategoryId || !servingSize) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const result = await addDish(
      {
        dish_id: Number(dishId),
        meal_category_id: Number(mealCategoryId),
        serving_size_g: Number(servingSize),
      },
      Number(dietId)
    );

    if (result) {
      setSuccess(true);
      setDishId("");
      setMealCategoryId("");
      setServingSize("");
      navigate("/diets");
    } else {
      setError("No se pudo agregar el plato. Intenta nuevamente.");
    }
  };

  return (
    <div className="add-dish-container">
      <h2>Agregar Plato a la Dieta</h2>
      <form className="add-dish-form" onSubmit={handleSubmit}>
        <label>
          Plato:
          <select
            value={dishId}
            onChange={(e) => {
              setDishId(e.target.value);
              setMealCategoryId(""); // Reiniciar categoría
            }}
          >
            <option value="">Selecciona un plato</option>
            {dishes.map((dish) => (
              <option key={dish.id} value={dish.id}>
                {dish.name}
              </option>
            ))}
          </select>
        </label>
        <br />

        {selectedDish && (
          <>
            <label>
              Categoría del plato:
              <select
                value={mealCategoryId}
                onChange={(e) => setMealCategoryId(e.target.value)}
              >
                <option value="">Selecciona una categoría</option>
                {selectedDish.id_dish_category.map((catId: number) => {
                  const category = mealCategories.find((cat) => cat.id === catId);
                  return (
                    <option key={catId} value={catId}>
                      {category ? category.description : `Categoría #${catId}`}
                    </option>
                  );
                })}
              </select>
            </label>
            <br />
          </>
        )}

        <label>
          Tamaño de porción (g):
          <input
            type="number"
            placeholder="Tamaño de porción (g)"
            value={servingSize}
            onChange={(e) => setServingSize(e.target.value)}
          />
        </label>
        <br />

        <button type="submit">Agregar Plato</button>
      </form>

      {success && <p className="success-message">¡Plato agregado correctamente!</p>}
      {error && <p className="error-message">{error}</p>}

      {selectedDish && (
        <div className="dish-details">
          <h3>Detalles del plato seleccionado</h3>
          <p><strong>Nombre:</strong> {selectedDish.name}</p>
          <p><strong>Descripción:</strong> {selectedDish.description}</p>
          <p><strong>Calorías:</strong> {selectedDish.calories}</p>
          <p><strong>Carbohidratos:</strong> {selectedDish.carbs}</p>
          <p><strong>Grasas:</strong> {selectedDish.fats}</p>
          <p><strong>Proteínas:</strong> {selectedDish.proteins}</p>
          <p><strong>Peso base:</strong> {selectedDish.weight}g</p>
        </div>
      )}
    </div>
  );
};

export default AddDishToDiet;