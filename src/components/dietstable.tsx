import './dietstable.css';
import { Diet } from '../Models/diet';

interface DietsTableProps {
    data: Diet[];
    onAddToDiet: (item: Diet) => void;
}
export const DietsTable = ({ data, onAddToDiet }: DietsTableProps) => {
    return (
        <div className="diets-container">
            <div className="diets-grid">
                {data.map((item) => (
                    <div key={item.id} className="diet-card">
                        <h2 className="diet-name">{item.name}</h2>
                        <p className="diet-observation">{item.observation}</p>
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