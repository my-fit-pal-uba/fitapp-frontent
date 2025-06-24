
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChangePassword } from '../services/change_password.services';

import './signup.css';

function ChangePasswordPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();

    async function hashPassword(password: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async function handleChangePassword() {
        const hashedPassword = await hashPassword(password);
        const result = await ChangePassword(email, hashedPassword);
        if (result) {
            navigator('/login');
        } else {
            alert("Error al cambiar la contraseña. Por favor, inténtelo de nuevo.");
        }
    }

    return (
        <div className="sign-up-card-wrapper">
            <form action="" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div className="app-title">
                    <p>PeakFit</p>
                </div>
                <div className='input-wrapper'>
                    <div className='name-input-wrapper'>
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
                                placeholder="Ingrese su nueva contraseña"
                                className="input"
                            />
                        </div>
                    </div>

                    <div className="signin-button-wrapper">
                        <button type="button" onClick={() => { handleChangePassword() }}>
                            Cambiar contraseña
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );

}

export default ChangePasswordPage;
