import React from 'react';
import { useHistory } from 'react-router-dom';
import './orphanage-apply.css';



export default function OrphanageApply() {
    const { push } = useHistory();

    function home() {
        push('/app');
    }

    return (
        <div id="status-page">
            <div className="content">
                <main>
                    <h1>Ebaaa!</h1>
                    <p>
                        O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)
                    </p>
                    {/* <button type="button" onClick={handledeleteSubmit}>
                        Sim!
                    </button> */}
                    <button type="button" onClick={home}>
                        Voltar para o dashboard
                </button>
                </main>
            </div>
        </div>
    );
}