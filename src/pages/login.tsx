import { useState, FormEvent, JSX } from 'react';
import { useNavigate } from 'react-router';
import './login.css';

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de autenticación aquí
    console.log({ email, password });
    // Ejemplo de redirección después del login:
    // navigate('/dashboard');
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
          <button type="button" onClick={() => {}}>
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