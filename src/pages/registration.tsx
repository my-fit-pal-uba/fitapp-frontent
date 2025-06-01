import { getToken } from '../Models/token';
import { User } from '../Models/user';
import { registerProfile } from '../services/registration.services';
import './registration.css'
import { useNavigate } from 'react-router';

function Registration() {
    const navigator = useNavigate();

    const handleRegistration = (role: string) => {
        const user: User | null = getToken();
        if (!user) {
            return;
        }
        const userId: number = user.user_id;
        const result = registerProfile(userId, role);
        if (!result) {
            return;
        }
        navigator('/home');
    }


    return (
        <div className="registration-wrapper">
            <p className='title'>Queremos saber más de vos!!!</p>
            <p className='subtitle'>¿Qué rol pretendes usar?</p>
            <div className="rols-wrapper">
                <button
                    type="button"
                    className="card-button"
                    onClick={() => handleRegistration("fitness_buddy")}
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
                    onClick={() => handleRegistration("personal_trainer")}
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