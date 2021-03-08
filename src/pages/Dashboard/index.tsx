import React, { useEffect, useState } from 'react';
import { FiEdit3, FiMapPin, FiTrash } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import mapIcon from '../../utils/mapIcon';
import ToastAnimated from '../../utils/Toast/toast';
import './dashboard.css';

export interface IOrphanageImages {
    id?: number;
    url?: string;
    link?: string;
}

export interface IOrphanage {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    accept?: boolean;
    images: IOrphanageImages[];
}

const Dashboard: React.FC = () => {
    const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);
    
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })        
    }, []);

    return (
        <div id="page-dashboard">
            <Sidebar />
            <ToastAnimated />
            <main className="content-wrapper">
                <h1>Orfanatos Cadastrados</h1>

                <div className="cards-wrapper">
                    
                    {orphanages?.map((orphanage) => (
                        <div className="card-container" key={orphanage.id}>
                            <Map
                                className="map"
                                center={[orphanage.latitude, orphanage.longitude]}
                                zoom={16}
                                style={{ width: '100%', height: '100%' }}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer
                                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                />
                                <Marker
                                    interactive={false}
                                    icon={mapIcon}
                                    position={[orphanage.latitude, orphanage.longitude]}
                                />
                            </Map>
                            <div>
                                <strong>{orphanage.name}</strong>
                                <div>
                                    <Link to={`/orphanage/${orphanage.id}`}>
                                        <FiMapPin size={24} color="#15C3D6" />
                                    </Link>
                                    <Link to={{ pathname: '/dashboard/edit', state: { orphanage } }}                                    >
                                        <FiEdit3 size={20} color="#15C3D6" />
                                    </Link>
                                    <Link to={`/dashboard/delete/${orphanage.id}`}>
                                        <FiTrash size={20} color="#ff9e9e" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;