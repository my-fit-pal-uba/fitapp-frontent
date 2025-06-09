import './nutritiontable.css';
import { Dish } from '../Models/dish';

const NutritionTable: React.FC<{ data: Dish[] }> = ({ data }) => {

    const handleAddToMeal = (item: Dish) => {
        // Aquí puedes implementar la lógica para agregar el plato a una comida
        console.log(`Agregado a la comida: ${item.name}`);
        console.log(item);
        
    }

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
                                handleAddToMeal(item);
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

export default NutritionTable;