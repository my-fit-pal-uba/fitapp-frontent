import { useState } from "react";
import { getToken } from '../Models/token';
import { DevUrl } from "../env/dev.url.model";
import './exercise_card.css';
import { User } from '../Models/user';

export default function ExerciseCard({ exercise, onClick, averageRating = 0, initialUserRating = 0 }: { exercise: any, onClick: () => void, averageRating?: number, initialUserRating?: number }) {
  const [hoverRating, setHoverRating] = useState(0);


  const user: User | null = getToken();

  const [userRating, setUserRating] = useState<number>(initialUserRating);
  const [message, setMessage] = useState<string | null>(null);


  const handleRating = async (rating: number) => {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/exercises/${exercise.exercise_id}/rate`, {
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
      <div className="exercise-card">
        <div className="exercise-content">
          <div className="exercise-header">
              <h2>{exercise.name}</h2>
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
          <p>{exercise.description}</p>
          <p><strong>Tipo:</strong> {exercise.type}</p>
          <p><strong>Lugar:</strong> {exercise.place}</p>
          <p><strong>Grupo muscular:</strong> {exercise.muscular_group}</p>

          {exercise.photo_guide && <img src={exercise.photo_guide} alt={`${exercise.name} guía`} />}
          {exercise.video_guide && (
            <video controls>
              <source src={exercise.video_guide} type="video/mp4" />
              Tu navegador no soporta la etiqueta de video.
            </video>
          )}
        </div>
        <button className="realizar-button" onClick={onClick}>
          Realizar
        </button>
      </div>
    </>
  );
}