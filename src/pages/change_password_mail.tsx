import { useState } from "react";
import { useNavigate } from "react-router";
import { ChangePasswordMail } from "../services/change_password.services";
import './signup.css'

const ChangePassword = () => {


    const [email, setEmail] = useState('');
    const navigator = useNavigate();

    const handleChangePassword = async () => {

        const result = await ChangePasswordMail(email);
        if (result) {
            alert("Se ha enviado un correo para cambiar la contraseña");
            navigator('/login');
        }
    }

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
                </div>
                <div className="signin-button-wrapper">
                    <button type="button" onClick={() => { handleChangePassword() }}>
                        Enviar mail
                    </button>
                </div>
            </form>
        </div>

    );
}

export default ChangePassword;