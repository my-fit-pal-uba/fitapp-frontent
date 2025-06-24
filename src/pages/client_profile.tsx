import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Header from '../components/header';
import { DevUrl } from '../env/dev.url.model';
import { Profile } from '../Models/profile';
import './profile.css';

function ClientProfile() {
  const { clientId } = useParams<{ clientId: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
    const [formData, setFormData] = useState({
        age: '',
        height: '',
        gender: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const apiUrl = new URL(`${DevUrl.baseUrl}/profiles/get_profile`);
                apiUrl.searchParams.append('user_id', String(clientId));

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

    return (
        <div className="simple-profile-container">
            <Header />
            <h2 className="client-profile-title">Perfil del Cliente</h2>
            <form className="simple-profile-form">
            <div className="form-wrapper">
                <div className="form-group">
                <label htmlFor="age">Edad</label>
                <input
                    id="age"
                    name="age"
                    value={formData.age}
                    readOnly
                    placeholder="Ej: 28"
                />
                </div>

                <div className="form-group">
                <label htmlFor="height">Altura (cm)</label>
                <input
                    id="height"
                    name="height"
                    value={formData.height}
                    readOnly
                    placeholder="Ej: 175"
                />
                </div>

                <div className="form-group">
                <label htmlFor="gender">Género</label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    disabled
                >
                    <option value="">Seleccionar</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                </select>
                </div>
            </div>
            </form>
        </div>
    );
}


export default ClientProfile;