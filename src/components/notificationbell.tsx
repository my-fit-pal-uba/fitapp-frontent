import { useEffect, useRef, useState } from "react";
import './notificationbell.css';
import { getNotifications } from "../services/notifications.services";
import { getToken } from "../Models/token";
import type { Notification } from "../Models/notification";

const NotificationBell = () => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        
        const getUserNotifications = async () => {
            const user_id = getToken()?.user_id ?? 0; 
            const notifications: Notification[] = await getNotifications(user_id);
            setNotifications(notifications);
        }

        getUserNotifications();
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <div className="notification-bell">
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Ver notificaciones"
            >
                <span className="material-symbols-outlined bell-icon">
                    notifications
                </span>
            </button>

            {isOpen && (
                <div className="notification-list" ref={dropdownRef}>
                    {notifications.length === 0 ? (
                        <div className="no-notifications">No notifications</div>
                    ) : (
                        notifications
                            .filter(notification => notification.date < new Date())
                            .map(notification => (
                                <div key={notification.id} className="notification-item">
                                    {notification.description}
                                </div>
                            ))
                    )}
                </div>
            )}

        </div>
    );
}

export default NotificationBell;