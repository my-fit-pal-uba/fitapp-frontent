import { useState } from 'react';
import './signup.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="sign-up-card-wrapper">
      <form action="" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
          <button type="button" onClick={() => { }}>
            Crear Cuenta
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;