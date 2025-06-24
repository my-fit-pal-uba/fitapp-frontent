import { useEffect, useState } from 'react';
import './profile.css';
import Header from '../components/header';
import { DevUrl } from '../env/dev.url.model';
import './login.css';
import { User } from '../Models/user';
import { getToken } from '../Models/token';
import { Profile } from '../Models/profile';

function SimpleProfileForm() {
    const [formData, setFormData] = useState({
        age: '',
        height: '',
        gender: '',
    });

    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user: User | null = getToken();
                
                if (!user ) {
                    return 
                }

                const apiUrl = new URL(`${DevUrl.baseUrl}/profiles/get_profile`);
                apiUrl.searchParams.append('user_id', String(user.user_id));

                const response = await fetch(apiUrl.toString(), {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                const data = await response.json();
                if (!data.response) {
                    return;
                }
                const profile: Profile = data.message;
                setFormData({
                    age: profile.age !== null ? String(profile.age) : '',
                    height: profile.height !== null ? String(profile.height) : '',
                    gender: profile.gender !== null ? String(profile.gender) : '',
                });

            } catch (error) {
                console.error('Error al cargar el perfil:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: (name === 'age' || name === 'height') ? (value === '' ? '' : Number(value)) : value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const user: User | null = getToken();
            if (!user) {
                return;
            }
            const apiUrl = new URL(`${DevUrl.baseUrl}/profiles/save_profile`);
            apiUrl.searchParams.append('user_id', String(user.user_id));
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
            showToast('Error al guardar los datos. Por favor, intenta de nuevo completando todos los campos.', 'error');
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
            {getToken() &&
                <div className="link-code-container">
                    <button
                        type="button"
                        className="copy-link-btn"
                        onClick={async () => {
                            try {
                                const user: User | null = getToken();
                                if (!user) return;

                                const apiUrl = new URL(`${DevUrl.baseUrl}/profiles/get_code`);
                                apiUrl.searchParams.append('user_id', String(user.user_id));

                                const res = await fetch(apiUrl.toString(), {
                                    method: 'GET',
                                    headers: {
                                        'Accept': 'application/json',
                                    },
                                });

                                const data = await res.json();

                                if (!data.code) {
                                    alert("No se pudo obtener el código.");
                                    return;
                                }

                                const code = data.code;
                                await navigator.clipboard.writeText(code);
                                showToast("Código copiado al portapapeles.", "success");
                            } catch (err) {
                                console.error("Error copiando el código:", err);
                                showToast("No se pudo obtener el código.", "error");
                            }
                        }}
                    >
                        Copiar código de vinculación
                    </button>
                </div>
            }
            {toast && (
                <div className='flash-message'>
                    {toast.message}
                </div>
            )}
        </div>
    );
}

export default SimpleProfileForm;