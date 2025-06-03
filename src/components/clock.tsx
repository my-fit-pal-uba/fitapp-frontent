import { useState, useEffect } from 'react';
import './clock.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
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
      </div>
    </div>
  );
};

export default Clock;