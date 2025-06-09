import { Dish } from "../Models/dish";
import { useState } from "react";
import "./mealregistrationmodal.css";

interface MealRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    dish: Dish | null;
    onRegister: (quantity: number) => void;
}

export const MealRegistrationModal = ({
    isOpen,
    onClose,
    dish,
    onRegister
}: MealRegistrationModalProps) => {
    const [quantity, setQuantity] = useState(100);

    if (!isOpen || !dish) return null;

    return (
        <>
            <div className={`modal-backdrop ${isOpen ? 'active' : ''}`} onClick={onClose}></div>

            <div className="modal-container">
                <div className="modal-content">

                    <h2 className="modal-title">Registrar Consumo de {dish.name}</h2>

                    <div className="form-group">
                        <label>Cantidad (gramos):</label>
                        <div className="input-quantity">
                            <input
                                type="text"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="buttons-wrapper">
                        <button className="modal-close-button" onClick={onClose}>
                            Cancelar
                        </button>
                        <div className="modal-actions">
                            <button
                                className="confirm-button"
                                onClick={() => {
                                    onRegister(quantity);
                                    onClose();
                                }}
                            >
                                Registrar Consumo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};