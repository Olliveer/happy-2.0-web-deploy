import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';
import SideRecovery from '../../components/PageLogin/PageLogin';
import api from '../../services/api';
import ToastAnimated, { showToast } from '../../utils/Toast/toast';
import './reset-password.css';

interface TokenParams {
    token: string;
}

function ResetPassword() {
    const history = useHistory();
    const params = useParams<TokenParams>();
    const [password, setPassword] = useState('');
    const [re_password, setRePassword] = useState('');

    const notify = () => showToast({ type: "warn", message: "Confirme seu password" });

    function goBack() {
        history.push("/");
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (password !== re_password) {
            history.push(`/reset/${params.token}`);
            notify();
        } else {
            const data = {
                token: params.token,
                password: password
            }
            await api.post('reset', data).then(msg => {
                showToast({ type: "success", message: msg.data.message })
                setTimeout(() => {
                    history.push('/login');
                }, 2000)
            })
                .catch(err => {
                    showToast({ type: "error", message: err.response.data.error })
                    setTimeout(() => {
                        history.push(`/reset/${params.token}`);
                    }, 3000)
                });

        }


    }

    return (
        <div id="recovery-page">
            <SideRecovery />
            <ToastAnimated />
            <aside className="form-box">
                <form onSubmit={handleSubmit} className="login-form">
                    <fieldset>
                        <legend>Redefinição de senha</legend>
                        <p>Escolha uma nova senha para você acessar o dashboard do Happy.</p>

                        <div className="input-block">
                            <label htmlFor="email">Nova senha</label>
                            <input
                                style={
                                    password ? { borderColor: '#A1E9C5' } : { borderColor: '#D3E2E5' }
                                }
                                type="password"
                                id="password"
                                value={password}
                                onChange={event => setPassword(event.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="email">Repetir senha</label>
                            <input
                                style={
                                    re_password ? { borderColor: '#A1E9C5' } : { borderColor: '#D3E2E5' }
                                }
                                type="password"
                                id="password"
                                value={re_password}
                                onChange={event => setRePassword(event.target.value)} />
                        </div>
                    </fieldset>
                    <button disabled={false} className="confirm-button" type="submit">
                        Entrar
                    </button>
                </form>

                <button type="button" className="back-btn" onClick={goBack}>
                    <FiArrowLeft size={16} color="#15C3D6" />
                </button>
            </aside>
        </div>
    );
}
export default ResetPassword;