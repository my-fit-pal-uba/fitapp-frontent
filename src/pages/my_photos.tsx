import { useState, useEffect, FormEvent } from 'react';
import Header from "../components/header";
import { getToken } from '../Models/token';
import { User } from '../Models/user';
import { DevUrl } from "../env/dev.url.model";
import "./my_photos.css"

type UserPhoto = {
    src: string; // base64 o URL
    uploaded_at: string; // fecha legible
};

const PhotosPage = () => {
    const user: User | null = getToken();
    const [photos, setPhotos] = useState<UserPhoto[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [activePhoto, setActivePhoto] = useState<UserPhoto | null>(null);


    const fetchPhotos = async () => {
        if (!user) return;
        try {
            const res = await fetch(`${DevUrl.baseUrl}/profiles/get_photos?user_id=${user.user_id}`);
            if (!res.ok) throw new Error("No se pudo cargar la galería");

            const data = await res.json();
            console.log("Respuesta completa del backend:", data);
            console.log("Photos crudas recibidas:", data.message?.data);
            const formatted = (data || []).map((photo: any) => ({
                src: `data:image/png;base64,${photo.photo}`,
                uploaded_at: new Date(photo.upload_date.split('.')[0]).toLocaleString(),
            }));

            setPhotos(formatted);
        } catch (err) {
            console.error(err);
            setMessage("Error al obtener las fotos");
        }
    };

    const handleUpload = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectedFile || !user) return;

        const formData = new FormData();
        formData.append("photo", selectedFile);

        try {
            const res = await fetch(`${DevUrl.baseUrl}/profiles/post_photo?user_id=${user.user_id}`, {
                method: "POST",
                body: formData
            });

            if (!res.ok) throw new Error("Error al subir la imagen");

            setMessage("¡Imagen subida con éxito!");
            setSelectedFile(null);
            await fetchPhotos();
        } catch (err) {
            console.error(err);
            setMessage("No se pudo subir la imagen");
        } finally {
            setTimeout(() => setMessage(null), 3000);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <>
            <Header />
            {message && <div className="flash-message">{message}</div>}
            <div className="photos-container">
                <h1 style={{ color: "white" }}>Mis Fotos</h1>

                <form onSubmit={handleUpload} className="upload-form" style={{ marginBottom: "1rem" }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                    required
                  />
                  <button type="submit">Subir</button>
                </form>

                <div className="gallery grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {photos.map((photo, i) => (
                        <div key={i} 
                            className="photo-card bg-white rounded-2xl shadow p-4 flex flex-col items-center"
                            onClick={() => setActivePhoto(photo)}
                        >
                            <img src={photo.src} alt={`Foto ${i + 1}`} className="rounded mb-3 w-full h-48 object-cover" />
                            <div className="upload-date text-sm text-gray-600">{photo.uploaded_at}</div>
                            {/* Si querés, podés agregar un botón para eliminar o editar */}
                        </div>
                    ))}
                </div>
            </div>

            {activePhoto && (
              <div
                className="modal-overlay fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
                onClick={() => setActivePhoto(null)}
              >
                <div
                  className="modal-content modal-content--photo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={activePhoto.src}
                    alt="Foto ampliada"
                    className="rounded max-w-full max-h-screen object-contain"
                  />
                  <button
                    className="absolute top-4 right-4 text-white text-4xl font-bold leading-none"
                    onClick={() => setActivePhoto(null)}
                    aria-label="Cerrar"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
        </>
    );
};

export default PhotosPage;