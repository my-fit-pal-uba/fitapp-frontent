import { useEffect, useRef, useState } from "react";
import './notificationbell.css';
import { getNotifications, markAllAsRead} from "../services/notifications.services";
import { getToken } from "../Models/token";
import type { Notification } from "../Models/notification";

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            const user_id = getToken()?.user_id ?? 0;
            try {
                const notifications = await getNotifications(user_id);
                const filtered = notifications.filter((n: Notification) => new Date(n.date) < new Date());
                setNotifications(filtered);
                setUnreadCount(filtered.length);
                // alert(`Tienes ${filtered.length} notificaciones nuevas`);
                markAllAsRead(filtered);

            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 60000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleClearAll = async () => {
        try {
            setNotifications([]);
            setUnreadCount(0);
        } catch (error) {
            console.error("Error clearing notifications:", error);
        }
    };

    return (
        <div className="notification-bell-container">
            <button
                className="bell-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Notificaciones"
                data-badge={unreadCount > 0 ? unreadCount : undefined}
            >
                <span className="material-symbols-outlined bell-icon">
                    notifications
                </span>
            </button>

            {isOpen && (
                <div className="notification-dropdown" ref={dropdownRef}>
                    <div className="dropdown-header">
                        <h3>Notificaciones</h3>
                        {unreadCount > 0 && (
                            <button 
                                className="clear-all-button"
                                onClick={handleClearAll}
                            >
                                Marcar todas como leídas
                            </button>
                        )}
                    </div>
                    
                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <div className="empty-notifications">
                                No hay notificaciones nuevas
                            </div>
                        ) : (
                            notifications
                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                .map(notification => (
                                    <div 
                                        key={notification.id} 
                                        className={`notification-item ${notification.active ? 'read' : 'unread'}`}
                                    >
                                        {!notification.active && <span className="unread-dot" />}
                                        <div className="notification-text">
                                            {notification.description}
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;