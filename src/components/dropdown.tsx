import { useState, useRef, useEffect } from 'react';
import './dropdown.css';
import { ereaseToken } from '../Models/token';
import { useNavigate } from 'react-router';

function DropdownButton() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navigator = useNavigate();
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
    }

    const onOpenProfile = () => {
        setIsOpen(false);
        navigator('/profile');
        console.log('open profile');
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
                    <button className="dropdown-item" onClick={() => { onOpenProfile(); }}>
                        👤 Ver Perfil
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