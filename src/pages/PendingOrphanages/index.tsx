import React, { useEffect, useState } from 'react';
import OrphanageCard from '../../components/OrphanageCard/OrphanageCard';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import './pending-orphanages.css';


interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function PendingOrphanage() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const pending = true;    

    useEffect(() => {
        api.get('pending').then(response => {
            setOrphanages(response.data);
        })
    }, []);

    return (
        <div id="page-pending">
            <Sidebar />

            <main className="content-wrapper">
                <h1>Orfanatos em espera</h1>

                <div className="cards-wrapper">
                    {orphanages.map((orphanage) => (
                        <OrphanageCard
                            {...{ pending }}
                            key={orphanage.id}
                            latitude={orphanage.latitude}
                            longitude={orphanage.longitude}
                            name={orphanage.name}
                            id={orphanage.id}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default PendingOrphanage;