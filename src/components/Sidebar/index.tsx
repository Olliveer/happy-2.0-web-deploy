import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiArrowLeft, FiHome, FiMapPin, FiPower, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import Badge from '@material-ui/core/Badge';

import mapMarkerImg from '../../images/map-marker.svg';
import api from '../../services/api';

import './sidebar.css'

export default function Sidebar() {
    const { signed, signOut } = useAuth();
    const { goBack } = useHistory();
    const [count, setCount] = useState(0);

    useEffect(() => {
        api.get('pending').then(res => {
            setCount(res.data.length)
        })
    }, [])

    return (
        <aside className="app-sidebar">
            <Link to="/">
                <img src={mapMarkerImg} alt="Happy" />
            </Link>
            {signed ? (
                <>
                    <div>
                        <Link to="/" className="home">
                            <FiHome size={24} color="#000" />
                        </Link>
                        <Link to="/dashboard/users" className="users">
                            <FiUser size={24} color="#FFF" />
                        </Link>

                        <Link to="/app" className="map">
                            <FiMapPin size={24} color="#FFF" />
                        </Link>
                        <Badge color="primary" overlap="circle" badgeContent={count}>
                            <Link to="/orphanages/pending" className="pending">
                                <FiAlertCircle size={24} color="#FFF" />
                            </Link>
                        </Badge>
                    </div>
                    <footer>
                        <button type="button" onClick={signOut}>
                            <FiPower size={24} color="#FFF" />
                        </button>
                    </footer>

                </>

            ) : (
                <footer>
                    <button type="button" onClick={goBack}>
                        <FiArrowLeft size={24} color="#FFF" />
                    </button>
                </footer>
            )}







        </aside>
    );
}