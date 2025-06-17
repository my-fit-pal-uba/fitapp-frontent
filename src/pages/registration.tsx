import { useEffect, useState } from 'react';
import { getToken, setToken } from '../Models/token';
import { User } from '../Models/user';
import { getUserRols, registerProfile } from '../services/registration.services';
import './registration.css';
import { useNavigate } from 'react-router';
import { Rol } from '../Models/rol';


function Registration() {
  const navigator = useNavigate();
  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const userRoles = await getUserRols();

        if (userRoles.length === 0) {
          setError('No hay roles disponibles');
        }

        let rols:Rol[] = userRoles.map((rol: any) => ({
          rol_id: rol.rol_id,
          resource_key: rol.resource_key,
          display_name: rol.display_name,
          description: rol.description,
          icon: rol.icon,
        }));

        setRoles(rols);
      } catch (err) {
        console.error('Error fetching roles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleRegistration = async (rol: Rol) => {
    const user: User | null = getToken();
    if (!user) {
      setError('Usuario no autenticado');
      return;
    }

    try {
      const result = await registerProfile(user.user_id, rol.rol_id);
      if (!result) {
        setError('Error al registrar el perfil');
        return;
      }
      setToken(result);
      navigator('/home');
    } catch (err) {
      setError('Error al procesar la solicitud');
      console.error('Registration error:', err);
    }
  };

  if (loading) {
    return (
      <div className="registration-wrapper">
        <p>Cargando roles disponibles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="registration-wrapper">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="registration-wrapper">
      <p className='title'>Queremos saber más de vos!!!</p>
      <p className='subtitle'>¿Qué rol pretendes usar?</p>
      <div className="rols-wrapper">
        {roles.map((role: Rol) => (
          <button
            key={role.rol_id}
            type="button"
            className="card-button"
            onClick={() => handleRegistration(role)}
            aria-label={`Seleccionar ${role.display_name}`}
          >
            <p className='card-title'>{role.display_name}</p>
            <span className="material-symbols-outlined icons">
              {role.icon}
            </span>
            <p className="card-description">{role.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Registration;