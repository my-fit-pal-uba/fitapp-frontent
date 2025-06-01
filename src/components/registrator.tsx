import React from 'react';
import './registrator.css';

const Registrator: React.FC = () => {
    const title: string = "¿Te parece registrar tu progreso hoy?";
    const [weight, setWeight] = React.useState<string>('');
    const [calories, setCalories] = React.useState<string>('');
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            alert(`Datos registrados:\nPeso: ${weight} kg\nCalorías: ${calories}`);
            setWeight('');
            setCalories('');
        }, 1500);
    };

    return (
        <div className="registrator-container">
            <div className="registrator-card">
                <h2 className="registrator-title">{title}</h2>

                <form onSubmit={handleSubmit} className="registrator-form">
                    <div className="input-group">
                        <label htmlFor="weight" className="input-label">Peso (kg)</label>
                        <input
                            type="text"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Ej: 72.5"
                            className="registrator-input"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="calories" className="input-label">Calorías consumidas</label>
                        <input
                            type="text"
                            id="calories"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            placeholder="Ej: 1850"
                            className="registrator-input"
                        />
                    </div>

                    <div className="button-wrapper">

                        <button
                            type="submit"
                            className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? '' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registrator;