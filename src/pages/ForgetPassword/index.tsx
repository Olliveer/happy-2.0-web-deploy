import React, { FormEvent, useState } from 'react';

import './recovery.css';

import SideRecovery from '../../components/PageLogin/PageLogin';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import ToastAnimated, { showToast } from '../../utils/Toast/toast';
import Loader from 'react-loader-spinner';




export function ForgetPassword() {
    const { goBack } = useHistory();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);


    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const data = {
            email: email
        }
        setLoading(true);
        await api.post('forgot', data).then(msg => {
            showToast({ type: "success", message: msg.data.message })            
            history.push('/');
            
        })
            .catch(err => {
                showToast({ type: "error", message: err.response.data.error })
                setTimeout(() => {
                    history.push('/recovery');
                }, 2000)
            });

            setLoading(false);

    }

    return (
        <div id="recovery-page">
            <SideRecovery />
            <ToastAnimated />
            <aside className="form-box">
                <form onSubmit={handleSubmit} className="login-form">
                    <fieldset>
                        <legend>Esqueci a senha</legend>
                        <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>

                        <div className="input-block">
                            <label htmlFor="email">E-mail</label>
                            <input
                                style={
                                    email ? { borderColor: '#A1E9C5' } : { borderColor: '#D3E2E5' }
                                }
                                type="email"
                                id="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)} />
                        </div>
                    </fieldset>
                    <button disabled={false} className="confirm-button" type="submit">
                        {!loading ? (
                            'Entrar'
                        ) : (
                                <Loader type="Puff" color="#FFF" height={40} width={40} />
                            )}
                    </button>
                </form>

                <button type="button" className="back-btn" onClick={goBack}>
                    <FiArrowLeft size={16} color="#15C3D6" />
                </button>
            </aside>
        </div>
    );
}