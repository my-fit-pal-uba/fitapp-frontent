import { useState, useRef, useEffect } from 'react';
import './dropdown.css';
import { ereaseToken, getToken } from '../Models/token';
import { useNavigate } from 'react-router';

function DropdownButton() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigator = useNavigate();
    const user = getToken();

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const onCloseSession = () => {
        setIsOpen(false);
        ereaseToken();
        navigator('/login');
    };

    const onOpenProfile = () => {
        setIsOpen(false);
        navigator('/profile');
    };

    const onOpenEjercicios = () => {
        setIsOpen(false);
        navigator('/exercises');
    };

    const onOpenRutinas = () => {
        setIsOpen(false);
        navigator('/routines');
    };

    const onOpenNutricion = () => {
        setIsOpen(false);
        navigator('/nutrition');
    };

    const onOpenDiets = () => {
        setIsOpen(false);
        navigator('/diets');
    };

    const onOpenGoals = () => {
        setIsOpen(false);
        navigator('/goals');
    };

    const onOpenRutineHistory = () => {
        setIsOpen(false);
        navigator('/rutine-history');
    }

    const onOpenPhotos = () => {
        setIsOpen(false);
        navigator('/my_photos');
    }

    const onOpenNotifications = () => {
        setIsOpen(false);
        navigator('/notifications');
    }

    const onOpenClients = () => {
        setIsOpen(false);
        navigator('/clients');
    }

    const onOpenCompartidos = () => {
        setIsOpen(false);
        navigator('/shared');
    }

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <button
                className="dropdown-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                Menú
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={onOpenProfile}>
                        👤 Ver Perfil
                    </button>
                    <button className="dropdown-item" onClick={onOpenEjercicios}>
                        🏋️ Ejercicios
                    </button>
                    <button className="dropdown-item" onClick={onOpenRutinas}>
                        🏃 Rutinas
                    </button>
                    <button className="dropdown-item" onClick={onOpenNutricion}>
                        🥗 Nutrición
                    </button>
                    <button className="dropdown-item" onClick={onOpenDiets}>
                        📋 Dietas
                    </button>
                    <button className="dropdown-item" onClick={onOpenGoals}>
                        🎯 Mis Objetivos
                    </button>
                    <button className="dropdown-item" onClick={() => { onOpenRutineHistory(); }}>
                        📅 Historial Rutinas
                    </button>
                    <button className="dropdown-item" onClick={() => { onOpenPhotos(); }}>
                        🖼️  Mis Fotos
                    </button>
                    <button className="dropdown-item" onClick={() => { onOpenNotifications(); }}>
                        🔔 Notificaciones
                    </button>
                    {user?.rol === "personal_trainer" && (
                        <button className="dropdown-item" onClick={() => { onOpenClients(); }}>
                            👥 Mis Clientes
                        </button>
                    )}
                    <button className="dropdown-item" onClick={() => { onOpenCompartidos(); }}>
                        🔗 Compartido
                    </button>
                    <button className="dropdown-item" onClick={() => { onCloseSession(); }}>
                        🚪 Cerrar Sesión
                    </button>
                </div>
            )}
        </div>
    );
}

export default DropdownButton;