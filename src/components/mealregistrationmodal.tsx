import { useState } from "react";
import { Dish } from "../Models/dish";

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
  const [quantity, setQuantity] = useState(100); // Valor por defecto en gramos
  const [date, setDate] = useState(new Date());

  if (!isOpen || !dish) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Registrar consumo de {dish.name}</h3>
        
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
          <button className="cancel-button" onClick={onClose}>Cancelar</button>
          <button 
            className="confirm-button" 
            onClick={() => {
              onRegister(quantity, date);
              onClose();
            }}
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
};