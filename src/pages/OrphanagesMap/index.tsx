import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import mapMarkerImg from '../../images/map-marker.svg';
import api from '../../services/api';
import mapIcon from '../../utils/mapIcon';
import './orphanage-map.css';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}


function OrphanagesMap() {
    const { signed } = useAuth();
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const [latitude, setLatitude] = useState(-25.4947402)
    const [longitude, setLongitude] = useState(-49.4298831)
    const [zoom, setZoom] = useState(9);

    function componentDidMount() {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setZoom(12);
        });
    }

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
        componentDidMount();
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>

                    <Link to="/">
                        <motion.img
                            animate={{ scale: [1, 1.5, 1.5, 1] }}
                            transition={{ duration: 0.8 }}
                            src={mapMarkerImg}
                            alt="Happy"
                        />
                    </Link>


                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                {!signed ? (
                    <footer>
                        <strong>Curitiba</strong>
                        <span>Paraná</span>
                    </footer>
                ) : (
                    <>
                        <footer>
                            <strong>Curitiba</strong>
                            <span>Paraná</span>
                        </footer>
                        <Link to="/" className="enter-login">
                            <strong>Área restrita</strong>
                        </Link>
                    </>
                )}

            </aside>

            <Map
                center={[latitude, longitude]}
                zoom={zoom}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                        >

                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>

                            </Popup>
                        </Marker>

                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;