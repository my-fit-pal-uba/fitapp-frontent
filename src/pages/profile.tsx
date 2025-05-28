import { useEffect, useState } from 'react';
import './profile.css';
import Header from '../components/header';
import { DevUrl } from '../env/dev.url.model';
import './login.css';
import { User } from '../Models/user';
import { getToken } from '../Models/token';

function SimpleProfileForm() {
    const [formData, setFormData] = useState({
        age: '',
        height: '',
        gender: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user: User | null = getToken();
                if (!user?.email) return;

                const apiUrl = new URL(`${DevUrl.baseUrl}/users/get_profile`);
                apiUrl.searchParams.append('email', user.email);

                const response = await fetch(apiUrl.toString(), {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                const data = await response.json();
                if (data?.response && Array.isArray(data.message)) {
                    const profile = data.message[1];
                    setFormData(prev => ({
                        ...prev,
                        age: profile.age?.toString() || '',
                        height: profile.height?.toString() || '',
                        gender: profile.gender || '',
                    }));
                }
            } catch (error) {
                console.error('Error al cargar el perfil:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const user: User | null = getToken();
            const apiUrl = new URL(`${DevUrl.baseUrl}/users/save_profile`);
            apiUrl.searchParams.append('email', user?.email ? user.email : '');
            apiUrl.searchParams.append('age', String(formData.age));
            apiUrl.searchParams.append('height', String(formData.height));
            apiUrl.searchParams.append('gender', formData.gender);

            const response = await fetch(apiUrl.toString(), {
                method: 'POST',
            });
            const data = await response.json();
            if (!data.response) {
                return
            }
        } catch (error) {
            console.error('Error al guardar los datos:', error);
            alert('Error al guardar los datos. Por favor, intenta de nuevo completando todos los campos.');
        }
    };

    return (
        <div className="simple-profile-container">
            <Header></Header>
            <h2>Mi Perfil</h2>
            <form onSubmit={handleSubmit} className="simple-profile-form">
                <div className="form-wrapper">
                    <div className="form-group">
                        <label htmlFor="age">Edad</label>
                        <input
                            type="number"
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
                        <label htmlFor="height">Altura (cm)</label>
                        <input
                            type="number"
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
                </div >
            </form>
        </div>
    );
}

export default SimpleProfileForm;