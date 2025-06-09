import './nutritiontable.css';
import { Dish } from '../Models/dish';

const NutritionTable: React.FC<{ data: Dish[] }> = ({ data }) => {
    return (
        <div className="nutrition-container">
            <div className="food-grid">
                {data.map((item) => (
                    <div key={item.id} className="food-card">
                        <h2 className="food-name">{item.name}</h2>
                        <p className="food-description">{item.description}</p>
                        
                        <div className="nutrition-facts">
                            <div className="nutrition-item">
                                <span>Calorías:</span>
                                <span>{item.calories} kcal</span>
                            </div>
                            <div className="nutrition-item">
                                <span>Proteínas:</span>
                                <span>{item.proteins}g</span>
                            </div>
                            <div className="nutrition-item">
                                <span>Carbohidratos:</span>
                                <span>{item.carbs}g</span>
                            </div>
                            <div className="nutrition-item">
                                <span>Grasas:</span>
                                <span>{item.fats}g</span>
                            </div>
                            <div className="nutrition-item">
                                <span>Peso:</span>
                                <span>{item.weight}g</span>
                            </div>
                        </div>
                        
                        <div className="categories">
                            Categorías: {item.id_dish_category.join(', ')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NutritionTable;