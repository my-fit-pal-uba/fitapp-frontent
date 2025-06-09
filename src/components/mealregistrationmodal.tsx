import { Dish } from "../Models/dish";
import { useState } from "react";
import "./mealregistrationmodal.css";

interface MealRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    dish: Dish | null;
    onRegister: (quantity: number, date: Date) => void;
}

export const MealRegistrationModal = ({
    isOpen,
    onClose,
    dish,
    onRegister
}: MealRegistrationModalProps) => {
    const [quantity, setQuantity] = useState(100);
    const [date, setDate] = useState(new Date());

    if (!isOpen || !dish) return null;

    return (
        <>
            <div className={`modal-backdrop ${isOpen ? 'active' : ''}`} onClick={onClose}></div>

            <div className="modal-container">
                <div className="modal-content">
                    <button className="modal-close-button" onClick={onClose}>
                        &times;
                    </button>

                    <h2 className="modal-title">Registrar Consumo de {dish.name}</h2>

                    <div className="form-group">
                        <label>Cantidad (gramos):</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            min="1"
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora:</label>
                        <input
                            type="datetime-local"
                            value={date.toISOString().slice(0, 16)}
                            onChange={(e) => setDate(new Date(e.target.value))}
                        />
                    </div>

                    <div className="modal-actions">
                        <button
                            className="confirm-button"
                            onClick={() => {
                                onRegister(quantity, date);
                                onClose();
                            }}
                        >
                            Registrar Consumo
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};