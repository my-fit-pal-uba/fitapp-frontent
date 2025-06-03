import { useState, useEffect } from 'react';
import './clock.css';
import { getToken } from '../Models/token';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [sessionDuration, setSessionDuration] = useState('00:00:00');

  useEffect(() => {

    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);

      const accessTime = getToken()?.access_time;

      if (!accessTime) {
        setSessionDuration('00:00:00');
        return;
      }

      try {
        const startTime = new Date(accessTime);
        if (isNaN(startTime.getTime())) {
          throw new Error('Fecha inválida');
        }

        const diff = now.getTime() - startTime.getTime();

        const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');

        setSessionDuration(`${hours}:${minutes}:${seconds}`);
      } catch (error) {
        console.error('Error al calcular tiempo de sesión:', error);
        setSessionDuration('00:00:00');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <div className="clock-container">
      <div className="clock-card">
        <div className="clock-display">
          <span className="clock-hours">{hours}</span>
          <span className="clock-separator">:</span>
          <span className="clock-minutes">{minutes}</span>
          <span className="clock-separator">:</span>
          <span className="clock-seconds">{seconds}</span>
        </div>
        <div className="clock-date">
          {time.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </div>
        <div className="session-info">
          <div className="session-label">Tiempo en la aplicación:</div>
          <div className="session-duration" style={{ color: 'black' }}>{sessionDuration}</div>
        </div>
      </div>
    </div>
  );
};

export default Clock;