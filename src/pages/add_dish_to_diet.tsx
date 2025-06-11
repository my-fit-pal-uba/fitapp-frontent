import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { addDish } from "../services/diets.services";

const AddDishToDiet = () => {
  const { dietId } = useParams();
  const navigate = useNavigate();
  const [dishId, setDishId] = useState("");
  const [mealCategoryId, setMealCategoryId] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div>
      <h2>Agregar Plato a la Dieta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID del Plato"
          value={dishId}
          onChange={e => setDishId(e.target.value)}
        />
        <input
          type="number"
          placeholder="ID de Categoría"
          value={mealCategoryId}
          onChange={e => setMealCategoryId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tamaño de porción (g)"
          value={servingSize}
          onChange={e => setServingSize(e.target.value)}
        />
        <button type="submit">Agregar Plato</button>
      </form>
      {success && <p style={{ color: "green" }}>¡Plato agregado correctamente!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Aquí puedes agregar lógica para buscar platos existentes y seleccionarlos */}
    </div>
  );
};

export default AddDishToDiet;