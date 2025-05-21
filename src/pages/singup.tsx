import { useState } from 'react';
import './signup.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      const response = await fetch('http://172.21.0.3:8080/access/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: hashedPassword,
          name: firstName,      // Puedes cambiar estos valores o agregarlos como inputs
          last_name: lastName
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Cuenta creada exitosamente');
        console.log(data);
      } else {
        alert('Error al crear la cuenta');
        console.log(data);
      }
    } catch (error) {
      alert('Error de conexión con la API');
      console.error(error);
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
        </div>
      </form>
    </div>
  );

};



export default SignUp;