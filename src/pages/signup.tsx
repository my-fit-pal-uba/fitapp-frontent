import { useState } from 'react';
import { useNavigate } from 'react-router';
import './signup.css';
import { setToken } from '../Models/token';
import { DevUrl } from '../env/dev.url.model';
import { GoogleLogin } from '@react-oauth/google';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  const handleSignUp = async () => {

    try {
      const hashedPassword = await hashPassword(password);

      const response = await fetch(`${DevUrl.baseUrl}/access/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: hashedPassword,
          name: firstName,
          last_name: lastName
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setToken(data.response);
        navigator('/registration');
      } else {
        navigator('/registration');
      }
    } catch (error) {
      navigator('/login');
    }
  };

  const handleGoogleSignUp = async (credentialResponse: any) => {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/access/signup/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: credentialResponse.credential }),
    });
    const data = await response.json();
    if (response.ok) {
      setToken(data.response);
      navigator('/registration');
    } else {
      // Maneja el error según tu lógica
      navigator('/registration');
    }
  } catch (error) {
    navigator('/login');
  }
};

  return (
    <div className="sign-up-card-wrapper">
      <form action="" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div className="app-title">
          <p>PeakFit</p>
        </div>
        <div className='input-wrapper'>
          <div className='name-input-wrapper'>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ingrese su nombre"
              className="input"
            />
          </div>
          <div className='last-name-input-wrapper'>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Ingrese su apellido"
              className="input"
            />
          </div>
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
          <button type="button" onClick={() => { handleSignUp() }}>
            Crear Cuenta
          </button>
          <GoogleLogin
            onSuccess={handleGoogleSignUp}
            onError={() => {
              alert('Error al registrarse con Google');
            }}
          />
        </div>
      </form>
    </div>
  );

};



export default SignUp;