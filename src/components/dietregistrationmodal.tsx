import { Diet } from "../Models/diet";
import { useState } from "react";
import "./dietregistrationmodal.css";

interface DietRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegistrar: (diet: Diet) => void;
}

export const DietRegistrationModal = ({
    isOpen,
    onClose,
    onRegistrar
}: DietRegistrationModalProps) => {
    const [nuevaDieta, setNuevaDieta] = useState<Diet>({
        id: 0,
        name: "",
        observation: "",
    });
    const [formError, setFormError] = useState<string | null>(null);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNuevaDieta({
            ...nuevaDieta,
            name: e.target.value,
        });
    };

    const handleObservationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNuevaDieta({
            ...nuevaDieta,
            name: e.target.value,
        });
    };

    const baseDiet: Diet = {
        id: 0,
        name: "",
        observation: "",
    }

    const handleClose = () => {
        setNuevaDieta(baseDiet);
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (nuevaDieta.name.trim().length > 300) {
            setFormError("El nombre del alimento no puede tener tantos caracteres.");
            return;
        }

        if (nuevaDieta.observation.trim().length > 500) {
            setFormError("La descripción del alimento no puede tener tantos caracteres.");
            return;
        }

        const dieta: Diet = {
            ...nuevaDieta,
            id: 0, 
        };

        onRegistrar(dieta);
        setNuevaDieta(baseDiet);
        setFormError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop active" onClick={onClose}></div>
            <div className="modal-container">
                <div className="modal-content">
                    <h2 className="modal-title">Registrar Nueva Dieta</h2>
                    {formError && <div className="form-error">{formError}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre de la dieta:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={nuevaDieta.name}
                                onChange={handleNameChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Descripcion de la dieta:</label>
                            <input
                                type="text"
                                name="descripción"
                                value={nuevaDieta.observation}
                                onChange={handleObservationChange}
                                required
                            />
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

export default DietRegistrationModal;