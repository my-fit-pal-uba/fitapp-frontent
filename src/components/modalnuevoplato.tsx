import React, { useState } from "react";
import "./modalnuevoplato.css"; // Asegúrate de crear este archivo CSS
import { NewDish } from "../Models/newdish";

interface ModalNuevoPlatoProps {
    isOpen: boolean;
    onClose: () => void;
    onRegistrar: (alimento: NewDish) => void;
}

export function NewDishModal({ isOpen, onClose, onRegistrar }: ModalNuevoPlatoProps) {
    const [nuevoAlimento, setNuevoAlimento] = useState<NewDish>({
        name: "",
        calories: 0,
        carbohydrates: 0,
        description: "",
        fats: 0,
        id: 0,
        proteins: 0,
        weight: 100,
        id_dish_category: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNuevoAlimento({
            ...nuevoAlimento,
            [name]: name === "nombre" ? value : Number(value),
        });
    };

    const baseDish: NewDish = {
        name: "",
        calories: 0,
        carbohydrates: 0,
        description: "",
        fats: 0,
        id: 0,
        proteins: 0,
        weight: 100,
        id_dish_category: [],
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const alimento: NewDish = {
            name: nuevoAlimento.name,
            calories: nuevoAlimento.calories,
            carbohydrates: nuevoAlimento.carbohydrates,
            description: "",
            fats: nuevoAlimento.fats,
            id: 0,
            proteins: nuevoAlimento.proteins,
            weight: nuevoAlimento.weight,
            id_dish_category: [],
        };
        onRegistrar(alimento);
        setNuevoAlimento(baseDish);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop active" onClick={onClose}></div>
            <div className="modal-container">
                <div className="modal-content">
                    <h2 className="modal-title">Registrar Nuevo Alimento</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre del alimento:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={nuevoAlimento.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Cantidad (gramos):</label>
                            <input
                                name="cantidad"
                                value={nuevoAlimento.weight}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="nutrition-fields">
                            <div className="form-group">
                                <label>Calorías (kcal):</label>
                                <input
                                    name="calorias"
                                    value={nuevoAlimento.calories}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Proteínas (g):</label>
                                <input
                                    name="proteinas"
                                    value={nuevoAlimento.proteins}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Carbohidratos (g):</label>
                                <input
                                    name="carbohidratos"
                                    value={nuevoAlimento.carbohydrates}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Grasas (g):</label>
                                <input
                                    name="grasas"
                                    value={nuevoAlimento.fats}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="buttons-wrapper">
                            <button
                                type="button"
                                className="modal-close-button"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                            <div className="modal-actions">
                                <button type="submit" className="confirm-button">
                                    Registrar Alimento
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewDishModal;