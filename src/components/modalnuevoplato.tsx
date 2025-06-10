import React, { useState } from "react";
import "./ModalNuevoPlato.css"; // Asegúrate de crear este archivo CSS
import { NewDish } from "../Models/newdish";

interface NuevoAlimento {
    nombre: string;
    cantidad: number;
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
}

interface ModalNuevoPlatoProps {
    isOpen: boolean;
    onClose: () => void;
    onRegistrar: (alimento: NuevoAlimento) => void;
}

export function ModalNuevoPlato({ isOpen, onClose, onRegistrar }: ModalNuevoPlatoProps) {
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
        const alimento: NuevoAlimento = {
            nombre: nuevoAlimento.name,
            cantidad: nuevoAlimento.weight,
            calorias: nuevoAlimento.calories,
            proteinas: nuevoAlimento.proteins,
            carbohidratos: nuevoAlimento.carbohydrates,
            grasas: nuevoAlimento.fats,
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
                                type="number"
                                name="cantidad"
                                min="1"
                                value={nuevoAlimento.weight}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="nutrition-fields">
                            <div className="form-group">
                                <label>Calorías (kcal):</label>
                                <input
                                    type="number"
                                    name="calorias"
                                    min="0"
                                    step="0.1"
                                    value={nuevoAlimento.calories}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Proteínas (g):</label>
                                <input
                                    type="number"
                                    name="proteinas"
                                    min="0"
                                    step="0.1"
                                    value={nuevoAlimento.proteins}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Carbohidratos (g):</label>
                                <input
                                    type="number"
                                    name="carbohidratos"
                                    min="0"
                                    step="0.1"
                                    value={nuevoAlimento.carbohydrates}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Grasas (g):</label>
                                <input
                                    type="number"
                                    name="grasas"
                                    min="0"
                                    step="0.1"
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

export default ModalNuevoPlato;