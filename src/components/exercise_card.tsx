import { useState } from "react";
import './exercise_card.css';

export default function ExerciseCard({ exercise, onClick }: { exercise: any, onClick: () => void }) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="exercise-card">
      <div className="exercise-content">
        <div className="exercise-header">
            <h2>{exercise.name}</h2>
            <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star ${hoverRating >= star ? "hovered" : ""}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                >
                    ★
                </span>
                ))}
            </div>
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
  );
}