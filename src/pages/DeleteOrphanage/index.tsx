import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';

import './delete-orphanage.css';

interface OrphanageId {
    id: string;
}

interface Orphanage {
    id: string;
    name: string;
}

export default function DeleteOrphanage() {
    const { push, goBack } = useHistory();
    const params = useParams<OrphanageId>();
    const [orphanage, setOrphanage] = useState<Orphanage>();

    function handledeleteSubmit() {
        api.post(`orphanage/delete/${params.id}`).then(response => {
            push('/dashboard');
        });
    }

    useEffect(() => {
        api.get(`orphanages/${params.id}`).then((response) => {
            setOrphanage(response.data);
        });
    }, [params.id]);

    if (!orphanage) {
        return <p>Carregando...</p>;
    }

    return (
        <div id="delete-page">
            <div className="content">
                <main>
                    <h1>Excluir!</h1>
                    <p>{`Você tem certeza que quer excluir ${orphanage.name}?`}</p>
                    <button type="button" onClick={handledeleteSubmit}>
                        Sim!
                    </button>
                    <button type="button" onClick={goBack}>
                        Voltar para o dashboard
                </button>
                </main>
            </div>
        </div>
    );
}