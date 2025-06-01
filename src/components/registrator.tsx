import React from 'react';
import './registrator.css';

type RegistratorProps = {
  type: 'weight' | 'calories';
  onSubmit: (value: string) => void;
};

const Registrator: React.FC<RegistratorProps> = ({ type, onSubmit }) => {
  const [value, setValue] = React.useState<string>('');
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      onSubmit(value);
      setIsSubmitting(false);
      setValue('');
    }, 1000);
  };

  const config = {
    weight: {
      title: "Registrar tu peso",
      label: "Peso actual",
      placeholder: "Ej: 72.5",
      unit: "kg"
    },
    calories: {
      title: "Registrar calorías",
      label: "Calorías consumidas",
      placeholder: "Ej: 1850",
      unit: "kcal"
    }
  };

  const currentConfig = config[type];

  return (
    <div className="registrator-container">
      <div className="registrator-card">
        <h2 className="registrator-title">{currentConfig.title}</h2>

        <form onSubmit={handleSubmit} className="registrator-form">
          <div className="input-group">
            <label htmlFor={type} className="input-label">
              {currentConfig.label} ({currentConfig.unit})
            </label>
            <input
              type="text"
              id={type}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={currentConfig.placeholder}
              className="registrator-input"
            />
          </div>

          <div className="button-wrapper">
            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting || !value}
            >
              {isSubmitting ? '' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registrator;