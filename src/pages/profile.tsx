import { useState } from 'react';
import './profile.css';
import Header from '../components/header';

function SimpleProfileForm() {
    const [formData, setFormData] = useState({
        age: '',
        weight: '',
        height: '',
        gender: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Datos enviados:', formData);
        // Lógica para guardar los datos
    };

    return (
        <div className="simple-profile-container">
            <Header></Header>
            <h1>Mi Perfil</h1>
            <div className="form-wrapper">

                <form onSubmit={handleSubmit} className="simple-profile-form">
                    <div className="form-group">
                        <label htmlFor="age">Edad</label>
                        <input
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Ej: 28"
                            min="12"
                            max="99"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="weight">Peso (kg)</label>
                        <input
                            id="weight"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            placeholder="Ej: 70"
                            step="0.1"
                            min="30"
                            max="200"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="height">Altura (cm)</label>
                        <input
                            id="height"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            placeholder="Ej: 175"
                            min="100"
                            max="250"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Género</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar</option>
                            <option value="male">Masculino</option>
                            <option value="female">Femenino</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-btn">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SimpleProfileForm;