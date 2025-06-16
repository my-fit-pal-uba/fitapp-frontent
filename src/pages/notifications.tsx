import { useState } from 'react';
import "./notifications.css";
import Header from '../components/header';

type Notification = {
    description: string;
    date: Date,
};

function Notifications() {
    const emptyNotification: Notification = {
        description: '',
        date: new Date(),
    };
    const [newNotification, setNewNotification] = useState<Notification>(emptyNotification);


    const handleRegisterDate = (date: string): void => {
        console.table(date);
        if (!date) {
            console.error("Invalid date provided");
            return;
        }
        const parsedDate = new Date(date);
        console.table(parsedDate);
        console.table(typeof parsedDate);
        setNewNotification({
            ...newNotification,
            date: parsedDate,
        });
        console.table(newNotification);
    }

    const handleNotificationNameChange = (name: string) => {
        setNewNotification({
            ...newNotification,
            description: name,
        });
    }

    return (
        <>
            <Header></Header>
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
                                    value={newNotification.date.toISOString().split('T')[0]}
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
                            <label >Hora:</label>
                            <input
                                type="text"
                                value={0}
                                onChange={(e) => handleRegisterDate(e.target.value)}
                                placeholder="Hora"
                            />
                        </div>
                        <div className="date-input-wrapper">
                            <label >Minuto:</label>
                            <input
                                type="text"
                                value={0}
                                onChange={(e) => handleRegisterDate(e.target.value)}
                                placeholder="Minutos"
                            />
                        </div>
                    </div>

                    <div className="date-input-wrapper">

                        <label>Descripcion:</label>
                        <input
                            type="text"
                            value={newNotification.description}
                            onChange={(e) => handleNotificationNameChange(e.target.value)}
                            placeholder="Escribe tu notificación..."
                        />
                    </div>
                </div>
                <div className="notification-button-wrapper">
                    <button className="notification-button">
                        Agregar Notificación
                    </button>
                </div>
            </div>

        </div >
        </>
    );

}

export default Notifications;