import './dietstable.css';
import { Diet } from '../Models/diet';
import { Dish } from '../Models/dish';

interface DietsTableProps {
    data: Diet[];
    onAddToDiet: (item: Diet) => void;
}
export const DietsTable = ({ data, onAddToDiet }: DietsTableProps) => {
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
                                    {item.dishes.map((dish: Dish) => (
                                        <li key={dish.id}>
                                            <strong>{dish.name}</strong> - {dish.description}
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