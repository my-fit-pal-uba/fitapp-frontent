import './registration.css'

function Registration() {
    return (
        <div className="registration-wrapper">
            <p className='title'>Queremos saber más de vos!!!</p>
            <p className='subtitle'>¿Qué rol pretendes usar?</p>
            <div className="rols-wrapper">
                <button
                    type="button"
                    className="card-button"
                    onClick={() => console.log('Fitness Buddy seleccionado')}
                    aria-label="Seleccionar Fitness Buddy"
                >
                    <p className='card-title'>Fitness Buddy</p>
                    <span className="material-symbols-outlined icons">
                        fitness_center
                    </span>
                    <p className="card-description">Usuario que busca entrenar y encontrar compañeros</p>
                </button>

                <button
                    type="button"
                    className="card-button"
                    onClick={() => console.log('Personal Trainer seleccionado')}
                    aria-label="Seleccionar Personal Trainer"
                >
                    <p className='card-title'>Personal trainer</p>
                    <span className="material-symbols-outlined icons">
                        sports
                    </span>
                    <p className="card-description">Profesional que ofrece servicios de entrenamiento</p>
                </button>
            </div>
        </div>
    );
}

export default Registration;