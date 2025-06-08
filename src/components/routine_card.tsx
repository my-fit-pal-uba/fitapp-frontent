import { useState } from "react";
import { getToken } from '../Models/token';
import { DevUrl } from "../env/dev.url.model";
import './routine_card.css';
import { User } from '../Models/user';
import { Routine } from "../Models/routine";

export default function RoutineCard({ routine, onClick, averageRating = 0, initialUserRating = 0 }: { routine: any, onClick: () => void, averageRating?: number, initialUserRating?: number }) {
  const [hoverRating, setHoverRating] = useState(0);


  const user: User | null = getToken();

  const [userRating, setUserRating] = useState<number>(initialUserRating);
  const [message, setMessage] = useState<string | null>(null);


  const handleRating = async (rating: number) => {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/routines/${routine.routine_id}/rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user?.user_id,
        rating: rating,
      }),
    });

    const text = await response.text();
    if (text) {
      const data = JSON.parse(text)
      setUserRating(rating);
      setMessage("¡Gracias por tu valoración!");
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage("Error: Respuesta vacía en servidor");
      setTimeout(() => setMessage(null), 3000);
    }
  } catch (error) {
    setMessage("Ocurrió un error al enviar tu calificación.");
    setTimeout(() => setMessage(null), 3000);
    console.error(error);
  }
};

  return (
    <>
      {message && <div className="flash-message">{message}</div>}
      <div className="routine-card">
        <div className="routine-content">
          <div className="routine-header">
              <h2>{routine.name}</h2>
              <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => {
                      if (hoverRating >= star) {
                          return <span
                              key={star}
                              className="star hovered"
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => handleRating(star)}
                          >★</span>;
                      }

                      if (userRating >= star) {
                          return <span key={star}
                          className="star user-rated"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => handleRating(star)}
                          >★</span>;
                      }

                      return <span
                          key={star}
                          className="star"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => handleRating(star)}
                      >★</span>;
                  }
                  )}
              </div>
          </div>
          <div className="average-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                  <span
                  key={star}
                  className={star <= Math.round(averageRating) ? "star average" : "star-average-empty"}
                  >
                  ★
                  </span>
              ))}
          </div>
          <p>{routine.description}</p>
          <p>Grupo muscular: {routine.muscular_group}</p>
          <p>Series: {routine.series}</p>
          <ul>
            {routine.exercises.map((exercise, index) => (
              <li key={index}>{exercise.name}</li>
            ))}
          </ul>
        </div>
        <button className="realizar-button" onClick={onClick}>
          Realizar
        </button>
      </div>
    </>
  );
}