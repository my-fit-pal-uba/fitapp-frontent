import './dietstable.css';
import { Diet } from '../Models/diet';

const DietsTable: React.FC<{ data: Diet[] }> = ({ data }) => {
    return (
        <div className="diets-container">
            <div className="diets-grid">
                {data.map((item) => (
                    <div key={item.id} className="diet-card">
                        <h2 className="diet-name">{item.name}</h2>
                        <p className="diet-observation">{item.observation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DietsTable;