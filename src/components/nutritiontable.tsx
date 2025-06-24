import './nutritiontable.css';
import { Dish } from '../Models/dish';
import { useNavigate } from "react-router";
import { getToken } from "../Models/token";

interface NutritionTableProps {
    data: Dish[];
    onAddToMeal: (item: Dish) => void;
}
export const NutritionTable = ({ data, onAddToMeal }: NutritionTableProps) => {
    const navigate = useNavigate();
    const user = getToken();
    
    return (
        <div className="nutrition-container">
            <div className="food-grid">
                {data.map((item) => (
                    <div key={item.id} className="food-card">
                        <h2 className="food-name">{item.name}</h2>
                        <p className="food-description">{item.description}</p>
                        <div className="nutrition-grid">
                            <div className="nutrition-value">
                                <span>Proteínas</span>
                                <span>{item.proteins}g</span>
                            </div>
                            <div className="nutrition-value">
                                <span>Carbs</span>
                                <span>{item.carbs}g</span>
                            </div>
                            <div className="nutrition-value">
                                <span>Grasas</span>
                                <span>{item.fats}g</span>
                            </div>
                            <div className="nutrition-value">
                                <span>Peso</span>
                                <span>{item.weight}g</span>
                            </div>
                        </div>
                        <span className="food-calories">{item.calories} kcal</span>
                        <button
                            className="add-button"
                            onClick={() => {
                                onAddToMeal(item);
                            }}
                        >
                            +
                        </button>
                        {user?.rol === "personal_trainer" && (
                            <button
                                className="share-btn"
                                style={{ marginTop: "0.5rem", width: "100%" }}
                                onClick={() => navigate(`/compartir-plato/${item.id}`)}
                            >
                                Compartir
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NutritionTable;