import { useState, FormEvent, JSX } from 'react';
import { useNavigate } from 'react-router';
import './login.css';

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();


  async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        throw new Error('Email y contraseña son requeridos');
      }

      // Configuración de la petición
      const apiUrl = new URL('http://172.21.0.3:8080/access/login');
      apiUrl.searchParams.append('email', email);
      apiUrl.searchParams.append('password', await hashPassword(password));

      const response = await fetch(apiUrl.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      const data = await response.json();
      if (!data.response) {
        alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        console.table(data.message);
      } else {  
        console.table("Usuario logeado")
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className='login-card-wrapper'>
        <div className="app-title">
          <p>PeakFit</p>
        </div>
        <div className='input-wrapper'>
          <div className='email-input-wrapper' >
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su email"
              className="input"
            />
          </div>
          <div className='password-input-wrapper'>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              className="input"
            />
          </div>
        </div>
        <div className="login-button-wrapper">
          <button type="button" onClick={() =>
            navigate('/signup')
          }>
            Crear Cuenta
          </button>
          <button type="submit">
            Ingresar
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;