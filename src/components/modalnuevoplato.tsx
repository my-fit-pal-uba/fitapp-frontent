import React, { useState } from "react";
import "./modalnuevoplato.css"; // Asegúrate de crear este archivo CSS
import { NewDish } from "../Models/newdish";
import { MealCategory } from "../Models/meal_categorie";

interface ModalNuevoPlatoProps {
    isOpen: boolean;
    onClose: () => void;
    onRegistrar: (alimento: NewDish) => void;
    meal_categories: MealCategory[];
}

export function NewDishModal({ isOpen, onClose, onRegistrar, meal_categories }: ModalNuevoPlatoProps) {
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
    const [formError, setFormError] = useState<string | null>(null);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNuevoAlimento({
            ...nuevoAlimento,
            name: e.target.value,
        });
    };

    const handleChangeCantidad = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (isNaN(value)) {
            return;
        }
        setNuevoAlimento({
            ...nuevoAlimento,
            weight: value,
        });
    }

    const handleChangeCalories = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (isNaN(value)) {
            return;
        }
        setNuevoAlimento({
            ...nuevoAlimento,
            calories: value,
        });
    };

    const handleChangeProteins = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (isNaN(value)) {
            return;
        }
        setNuevoAlimento({
            ...nuevoAlimento,
            proteins: value,
        });
    };

    const handleChangeCarbohidrates = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (isNaN(value)) {
            return;
        }
        setNuevoAlimento({
            ...nuevoAlimento,
            carbohydrates: value,
        });

    };

    const handleChangeFats = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (isNaN(value)) {
            return;
        }
        setNuevoAlimento({
            ...nuevoAlimento,
            fats: value,
        });
    };

    const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNuevoAlimento({
            ...nuevoAlimento,
            description: e.target.value,
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

    const toggleCategoria = (categoryId: number) => {
        setNuevoAlimento(prev => {
            if (prev.id_dish_category.includes(categoryId)) {
                return {
                    ...prev,
                    id_dish_category: prev.id_dish_category.filter(id => id !== categoryId)
                };
            }
            return {
                ...prev,
                id_dish_category: [...prev.id_dish_category, categoryId]
            };
        });
    };

    const handleClose = () => {
        setNuevoAlimento(baseDish);
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        // e.preventDefault();
        // const alimento: NewDish = {
        //     name: nuevoAlimento.name,
        //     calories: nuevoAlimento.calories,
        //     carbohydrates: nuevoAlimento.carbohydrates,
        //     description: nuevoAlimento.description,
        //     fats: nuevoAlimento.fats,
        //     id: 0,
        //     proteins: nuevoAlimento.proteins,
        //     weight: nuevoAlimento.weight,
        //     id_dish_category: nuevoAlimento.id_dish_category,
        // };
        // onRegistrar(alimento);
        // setNuevoAlimento(baseDish);
        // onClose();  e.preventDefault();

        // Validaciones
        if (nuevoAlimento.name.trim().length < 3) {
            setFormError("El nombre del alimento debe tener al menos 3 caracteres.");
            return;
        }

        if (nuevoAlimento.weight <= 0) {
            setFormError("El peso debe ser mayor que 0 gramos.");
            return;
        }

        if (nuevoAlimento.id_dish_category.length === 0) {
            setFormError("Debes seleccionar al menos una categoría.");
            return;
        }

        // Si pasa validaciones
        const alimento: NewDish = {
            ...nuevoAlimento,
            id: 0, // asegúrate de que esto esté bien manejado en el backend
        };

        onRegistrar(alimento);
        setNuevoAlimento(baseDish);
        setFormError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop active" onClick={onClose}></div>
            <div className="modal-container">
                <div className="modal-content">
                    <h2 className="modal-title">Registrar Nuevo Alimento</h2>
                    {formError && <div className="form-error">{formError}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre del alimento:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={nuevoAlimento.name}
                                onChange={handleNameChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Cantidad (gramos):</label>
                            <input
                                name="cantidad"
                                value={nuevoAlimento.weight}
                                onChange={handleChangeCantidad}
                                required
                            />
                        </div>

                        <div className="nutrition-fields">
                            <div className="form-group">
                                <label>Calorías (kcal):</label>
                                <input
                                    name="calorias"
                                    value={nuevoAlimento.calories}
                                    onChange={handleChangeCalories}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Proteínas (g):</label>
                                <input
                                    name="proteinas"
                                    value={nuevoAlimento.proteins}
                                    onChange={handleChangeProteins}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Carbohidratos (g):</label>
                                <input
                                    name="carbohidratos"
                                    value={nuevoAlimento.carbohydrates}
                                    onChange={handleChangeCarbohidrates}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Grasas (g):</label>
                                <input
                                    name="grasas"
                                    value={nuevoAlimento.fats}
                                    onChange={handleChangeFats}
                                    required
                                />
                            </div>

                        </div>

                        <div className="form-group">
                            <label>Descripción:</label>
                            <input
                                type="text"
                                name="descripcion"
                                value={nuevoAlimento.description}
                                onChange={handleChangeDescription}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Selecciona las categorías aplicables:</label>
                            <div className="categorias-container">
                                {meal_categories.map(categoria => (
                                    <div
                                        key={categoria.id}
                                        className={`categoria-option ${nuevoAlimento.id_dish_category.includes(categoria.id) ? 'selected' : ''
                                            }`}
                                        onClick={() => toggleCategoria(categoria.id)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={nuevoAlimento.id_dish_category.includes(categoria.id)}
                                            readOnly
                                            className="hidden-checkbox"
                                        />
                                        <span className="categoria-name">{categoria.description}</span>
                                        {nuevoAlimento.id_dish_category.includes(categoria.id) && (
                                            <span className="check-icon">✓</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="selected-categories">
                                {nuevoAlimento.id_dish_category.length > 0 && (
                                    <>
                                        <span>Categorías seleccionadas: </span>
                                        {nuevoAlimento.id_dish_category.map(id => {
                                            const cat = meal_categories.find(c => c.id === id);
                                            return cat ? (
                                                <span key={id} className="selected-tag">
                                                    {cat.description}
                                                </span>
                                            ) : null;
                                        })}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="buttons-wrapper">
                            <button
                                type="button"
                                className="modal-close-button"
                                onClick={handleClose}
                            >
                                Cancelar
                            </button>
                            <div className="modal-actions">
                                <button type="submit" className="confirm-button"
                                    onClick={handleSubmit}>
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