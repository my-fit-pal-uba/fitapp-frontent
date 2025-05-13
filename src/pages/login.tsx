import { useState } from 'react';
import './login.component.css'

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string }) => void;
  error: string;
  setError: (message: string) => void;
}

const Login: React.FC<LoginFormProps> = ({ onLogin, setError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor ingresa email y contraseña');
      return;
    }

    onLogin({ email, password });
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
              class="input"
            />
          </div>
          <div className='password-input-wrapper'>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              class="input"
            />
          </div>
        </div>
        <div className="login-button-wrapper">
          <button type="submit" >
            Crear Cuenta
          </button>
          <button type="submit" >
            Ingresar
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
