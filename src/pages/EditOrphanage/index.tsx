import { LeafletMouseEvent } from "leaflet";
import React, { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import Loader from "react-loader-spinner";
import { useHistory } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { IOrphanage, IOrphanageImages } from '../../pages/Dashboard/index';
import api from "../../services/api";
import mapIcon from "../../utils/mapIcon";
import { showToast } from "../../utils/Toast/toast";
import './edit-orphanage.css';

interface IOrphanageProps {
    orphanage: IOrphanage;
    children: ReactNode;
}

export default function EditOrphanage() {
    const history = useHistory();
    const { orphanage } = history.location.state as IOrphanageProps;

    const [id] = useState(orphanage.id);
    const [name, setName] = useState(orphanage.name);
    const [about, setAbout] = useState(orphanage.about);
    const [instructions, setInstructions] = useState(orphanage.instructions);
    const [opening_hours, setOpeningHours] = useState(orphanage.opening_hours);
    const [open_on_weekends, setOpenOnWeekends] = useState(orphanage.open_on_weekends);
    const [position, setPosition] = useState({ latitude: orphanage.latitude, longitude: orphanage.longitude });
    const [loading, setLoading] = useState(false);

    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<IOrphanageImages[]>(
        orphanage.images
    );

    const [removeImage, setRemoveImage] = useState<IOrphanageImages[]>([]);

    function handleMapClick(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng;

        setPosition({
            latitude: lat,
            longitude: lng
        });
    }

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.target;
        if (!files || files.length === 0) {
            return;
        }
        const selectedImages = Array.from(files);

        selectedImages.forEach((image) => {
            setImages((oldImages) => [...oldImages, image]);
        });

        const selectedImagesPreview = selectedImages.map((image, index) => {
            const id = index;
            const url = URL.createObjectURL(image);
            const link = image.name;
            return { id, url, link };
        });

        selectedImagesPreview.forEach((selectedImage) => {
            if (!previewImages[0]) {
                setPreviewImages([selectedImage]);
            } else {
                setPreviewImages((oldPreviews) => [...oldPreviews, selectedImage]);
            }
        });
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { latitude, longitude } = position;

        const data = new FormData();
        data.append('id', id as any);
        data.append('name', name as any);
        data.append('about', about);
        data.append('instructions', instructions);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('opening_hours', opening_hours);
        data.append('open_on_weekends', String(open_on_weekends));
        images.forEach((image) => {
            data.append('images', image);
        });
        removeImage.forEach((image) => {
            data.append('id_images_remove', image.id as any);
        });


        setLoading(true);
        await api.put<IOrphanage>(`orphanage/edit`, data).then(msg => {
            showToast({ type: "success", message: `Orfanato ${orphanage.name} Updated` })
            history.push('/orphanages/pending');
        }).catch(
            err => showToast((err.status === 400)
                ? { type: "warn", message: err.response.data.error }
                : { type: "error", message: err.response.data.error })
        );
        setLoading(false);

    }

    return (
        <div id="page-edit-orphanage">
            <Sidebar />

            <main>
                <form onSubmit={handleSubmit} className="edit-orphanage-form">
                    <fieldset>
                        <legend>Atualizar Dados</legend>

                        <Map
                            center={[-25.4872759, -49.2942842]}
                            style={{ width: '100%', height: 280 }}
                            zoom={15}
                            onClick={handleMapClick}
                        >
                            <TileLayer
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />

                            {position.latitude !== 0 && (
                                <Marker
                                    interactive={false}
                                    icon={mapIcon}
                                    position={
                                        position.latitude !== 0
                                            ? [position.latitude, position.longitude]
                                            : [0, 0]
                                    }
                                />
                            )}

                            {/* <Marker interactive={false} icon={mapIcon} position={[-27.2092052,-49.6401092]} /> */}
                        </Map>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                name="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <textarea
                                id="name"
                                maxLength={300}
                                name="about"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>

                            <div className="images-container">
                                {previewImages &&
                                    previewImages.map((image, index) => (
                                        <div key={index}>
                                            <img src={image.url} alt="img" />
                                            <button className="remove-button"
                                                onClick={() => {
                                                    setRemoveImage((oldImages) => [...oldImages, image]);

                                                    const newPreviewIamges = previewImages.filter(
                                                        (previewImage) => {
                                                            if (previewImage.url !== image.url) {
                                                                return previewImage;
                                                            }
                                                            return null;
                                                        }
                                                    );
                                                    setPreviewImages(newPreviewIamges);

                                                    const filteredImages = images.filter((img) => {
                                                        return img.name !== image.link;
                                                    });
                                                    setImages(filteredImages);
                                                }}
                                            >
                                                <FiX size={20} color="#FF669D" />
                                            </button>
                                        </div>
                                    ))}

                                <label htmlFor="image[]">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                                <input
                                    multiple
                                    onChange={handleSelectImages}
                                    type="file"
                                    id="image[]"
                                />
                            </div>
                            <input multiple onChange={handleSelectImages} type="file" id="image[]" />
                        </div>

                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea
                                id="instructions"
                                name="instructions"
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">Hoário de Funcionamento</label>
                            <input
                                id="opening_hours"
                                name="opening_hours"
                                value={opening_hours}
                                onChange={(e) => setOpeningHours(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="open_on_weekends">Atende fim de semana</label>

                            <div className="button-select">
                                <button
                                    type="button"
                                    className={open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(true)}>
                                    Sim
                                </button>
                                <button
                                    type="button"
                                    className={!open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(false)}>
                                    Não
                                </button>
                            </div>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">
                        {!loading ? (
                            'Atualizar'
                        ) : (
                                <Loader type="Puff" color="#FFF" height={40} width={40} />
                            )}
                    </button>
                </form>
            </main>
        </div>
    );
}