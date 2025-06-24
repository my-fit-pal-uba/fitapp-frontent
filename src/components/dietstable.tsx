import './dietstable.css';
import { Diet } from '../Models/diet';
import { MealCategory } from '../Models/meal_categorie';

interface DietsTableProps {
    data: Diet[];
    onAddToDiet: (item: Diet) => void;
    categories: MealCategory[];
}
export const DietsTable = ({ data, onAddToDiet, categories}: DietsTableProps) => {
    return (
        <div className="diets-container">
            <div className="diets-grid">
                {Array.isArray(data) && data.map((item) => (
                    <div key={item.id} className="diet-card">
                        <h2 className="diet-name">{item.name}</h2>
                        <p className="diet-observation">{item.observation}</p>
                        <div className="diet-dishes-section">
                            <h3>Platos</h3>
                            {item.dishes && item.dishes.length > 0 ? (
                                <ul className="diet-dishes-list">
                                {item.dishes.map((dish: any) => (
                                    <li key={dish.id}>
                                    <div><strong>{dish.name}</strong></div>
                                    <div>{dish.description}</div>
                                    <div>
                                        <span><strong>Calorías:</strong> {dish.calories} kcal</span>
                                        {" | "}
                                        <span><strong>Carbohidratos:</strong> {dish.carbs} g</span>
                                        {" | "}
                                        <span><strong>Grasas:</strong> {dish.fats} g</span>
                                        {" | "}
                                        <span><strong>Proteínas:</strong> {dish.proteins} g</span>
                                    </div>
                                    <div>
                                        <span>
                                        <strong>Categoría:</strong>{" "}
                                        {categories.find((cat) => cat.id === dish.meal_category_id)?.description || dish.meal_category_id}
                                        </span>
                                        {" | "}
                                        <span><strong>Porción:</strong> {dish.serving_size_g} g</span>
                                    </div>
                                    </li>
                                ))}
                                </ul>
                            ) : (
                                <span className="no-dishes">No hay platos</span>
                            )}
                        </div>
                        <button
                            className="add-button"
                            onClick={() => {
                                onAddToDiet(item);
                            }}
                        >
                            +
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DietsTable;