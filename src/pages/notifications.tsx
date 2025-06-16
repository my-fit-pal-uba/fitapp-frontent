import { useState } from 'react';
import "./notifications.css";
import Header from '../components/header';
import { Notification } from '../Models/notification';


function Notifications() {
    const emptyNotification: Notification = {
        id: 0,
        description: '',
        date: new Date(),
    };
    const [newNotification, setNewNotification] = useState<Notification>(emptyNotification);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);

    const handleRegisterDate = (dateString: string): void => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error("Invalid date provided");
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
        const numValue = parseInt(value) || 0;

        if (type === 'hours') {
            setHours(Math.min(23, Math.max(0, numValue)));
        } else {
            setMinutes(Math.min(59, Math.max(0, numValue)));
        }

        const newDate = new Date(newNotification.date);
        if (type === 'hours') {
            newDate.setHours(numValue);
        } else {
            newDate.setMinutes(numValue);
        }

        setNewNotification({
            ...newNotification,
            date: newDate
        });
    }

    const handleNotificationNameChange = (name: string) => {
        setNewNotification({
            ...newNotification,
            description: name,
        });
    }

    const formatDateForInput = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const handleRegisterNewNotification = () => {
        if (!newNotification.description || !newNotification.date) {
            console.error("Notification description and date are required");
            return;
        }

        if (newNotification.date < new Date()) {
            console.error("Notification date cannot be in the past");
            return;
        }

        console.table(newNotification);
        console.log("Nueva notificación registrada:", newNotification);
        setNewNotification(emptyNotification);
        setHours(0);
        setMinutes(0);
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
                                    className="date-input-new"
                                />
                                <span className="calendar-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
                                    </svg>
                                </span>
                            </div>
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
                                />
                            </div>
                        </div>

                        <div className="date-input-wrapper">
                            <label>Descripción:</label>
                            <input
                                type="text"
                                value={newNotification.description}
                                onChange={(e) => handleNotificationNameChange(e.target.value)}
                                placeholder="Escribe tu notificación..."
                            />
                        </div>
                    </div>

                    <div className="notification-button-wrapper">
                        <button className="notification-button"
                            onClick={() => {
                                handleRegisterNewNotification();
                            }}
                        >
                            Agregar Notificación
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Notifications;