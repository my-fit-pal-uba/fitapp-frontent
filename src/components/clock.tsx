import { useState, useEffect } from 'react';
import './clock.css';

const AnimatedClock = () => {
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

  // Para el efecto de cambio de color
  const colorChange = (Number(seconds) % 2 === 0) ? 'even' : 'odd';

  return (
    <div className={`clock-container ${colorChange}`}>
      <div className="clock">
        <span className="hours">{hours}</span>
        <span className="separator blink"></span>
        <span className="minutes">{minutes}</span>
        <span className="seconds">{seconds}</span>
      </div>
      <div className="date">
        {time.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
      </div>
    </div>
  );
};

export default AnimatedClock;