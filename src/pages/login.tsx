import { useState, FormEvent, JSX } from 'react';
import { useNavigate } from 'react-router';
import { DevUrl } from '../env/dev.url.model';
import './login.css';
import { setToken } from '../Models/token';
import { GoogleLogin } from '@react-oauth/google';

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

      const apiUrl = new URL(`${DevUrl.baseUrl}/access/login`);
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
        return
      } else {
        setToken(data.response);
        navigate('/home');
      }
    } catch (error) {
      alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const response = await fetch(`${DevUrl.baseUrl}/access/login/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const data = await response.json();
      if (response.ok && data.response) {
        setToken(data.response);
        navigate('/home');
      } else {
        alert('Error al iniciar sesión con Google.');
      }
    } catch (error) {
      alert('Error al iniciar sesión con Google.');
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
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              className="input"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: 'absolute',
                right: '30px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
              tabIndex={-1}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        <div className="login-button-wrapper">
          <div className="access-buttons">

            <button type="button" onClick={() =>
              navigate('/signup')
            }>
              Crear Cuenta
            </button>
            <button type="submit">
              Ingresar
            </button>

          </div>
          <div className="other-options-wrapper">

            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                alert('Error al iniciar sesión con Google');
              }}
            />
            <button type="button" onClick={() => navigate('/password-mail')}>
              Olvidé mi contraseña
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;