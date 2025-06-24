import { useState } from 'react';
import "./notifications.css";
import Header from '../components/header';
import { Notification } from '../Models/notification';
import { postNotification } from '../services/notifications.services';
import { useParams } from 'react-router';

function ClientNotifications() {
    const { clientId } = useParams<{ clientId: string }>();
    const numericClientId = parseInt(clientId ?? "0", 10);

    const emptyNotification: Notification = {
        id: 0,
        description: '',
        date: new Date(),
    };
    const [newNotification, setNewNotification] = useState<Notification>(emptyNotification);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [errors, setErrors] = useState({
        description: '',
        date: '',
        time: ''
    });

    const validateForm = () => {
        const newErrors = {
            description: '',
            date: '',
            time: ''
        };
        let isValid = true;

        if (!newNotification.description.trim()) {
            newErrors.description = 'La descripción es requerida';
            isValid = false;
        }

        if (isNaN(newNotification.date.getTime())) {
            newErrors.date = 'Fecha inválida';
            isValid = false;
        } else if (newNotification.date < new Date()) {
            newErrors.date = 'La fecha no puede ser en el pasado';
            isValid = false;
        }

        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            newErrors.time = 'Hora inválida (00:00 - 23:59)';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegisterDate = (dateString: string): void => {
        const date = new Date(dateString);
        
        setErrors(prev => ({...prev, date: ''}));
        
        if (isNaN(date.getTime())) {
            setErrors(prev => ({...prev, date: 'Fecha inválida'}));
            return;
        }

        date.setHours(hours);
        date.setMinutes(minutes);

        setNewNotification({
            ...newNotification,
            date: date,
        });
    }

    const handleTimeChange = (type: 'hours' | 'minutes', value: string) => {
        setErrors(prev => ({...prev, time: ''}));
        
        const numValue = parseInt(value) || 0;
        const clampedValue = type === 'hours' 
            ? Math.min(23, Math.max(0, numValue)) 
            : Math.min(59, Math.max(0, numValue));

        if (type === 'hours') {
            setHours(clampedValue);
        } else {
            setMinutes(clampedValue);
        }

        const newDate = new Date(newNotification.date);
        if (type === 'hours') {
            newDate.setHours(clampedValue);
        } else {
            newDate.setMinutes(clampedValue);
        }

        setNewNotification({
            ...newNotification,
            date: newDate
        });
    }

    const handleNotificationNameChange = (name: string) => {
        setErrors(prev => ({...prev, description: ''}));
        setNewNotification({
            ...newNotification,
            description: name,
        });
    }

    const formatDateForInput = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const handleRegisterNewNotification = async () => {
        if (!validateForm()) {
            return;
        }

        console.log("Nueva notificación registrada:", newNotification);
        
        const userId = numericClientId
        await postNotification(newNotification, userId);
        setNewNotification(emptyNotification);
        setHours(0);
        setMinutes(0);
        setErrors({
            description: '',
            date: '',
            time: ''
        });
    }

    return (
        <>
            <Header />
            <div className="notifications-container">
                <p className="notifications-title">Notificaciones</p>

                <div className="notification-card">
                    <div className="notification-header">
                        <h2>Agregar nueva notificación</h2>
                    </div>

                    <div className="notification-input-container">
                        <div className="custom-date-input">
                            <label>Fecha:</label>
                            <div className="date-input-container">
                                <input
                                    type="date"
                                    value={formatDateForInput(newNotification.date)}
                                    onChange={(e) => handleRegisterDate(e.target.value)}
                                    className={`date-input-new ${errors.date ? 'error' : ''}`}
                                />
                                <span className="calendar-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
                                    </svg>
                                </span>
                            </div>
                            {errors.date && <span className="error-message">{errors.date}</span>}
                        </div>

                        <div className="hour-min-wrapper">
                            <div className="date-input-wrapper">
                                <label>Hora:</label>
                                <input
                                    value={hours}
                                    onChange={(e) => handleTimeChange('hours', e.target.value)}
                                    placeholder="Hora"
                                    min="0"
                                    max="23"
                                    className={errors.time ? 'error' : ''}
                                />
                            </div>
                            <div className="date-input-wrapper">
                                <label>Minuto:</label>
                                <input
                                    value={minutes}
                                    onChange={(e) => handleTimeChange('minutes', e.target.value)}
                                    placeholder="Minutos"
                                    min="0"
                                    max="59"
                                    className={errors.time ? 'error' : ''}
                                />
                            </div>
                            {errors.time && <span className="error-message time-error">{errors.time}</span>}
                        </div>

                        <div className="date-input-wrapper">
                            <label>Descripción:</label>
                            <input
                                type="text"
                                value={newNotification.description}
                                onChange={(e) => handleNotificationNameChange(e.target.value)}
                                placeholder="Escribe tu notificación..."
                                className={errors.description ? 'error' : ''}
                            />
                            {errors.description && <span className="error-message">{errors.description}</span>}
                        </div>
                    </div>

                    <div className="notification-button-wrapper">
                        <button 
                            className="notification-button"
                            onClick={handleRegisterNewNotification}
                        >
                            Agregar Notificación
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClientNotifications;