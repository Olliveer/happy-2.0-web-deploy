import React, { FormEvent, useState } from "react";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import api from '../../services/api';
import ToastAnimated, { showToast } from '../../utils/Toast/toast';
import { IUser } from '../Users';
import './user-edit.css';

interface User {
    user: IUser
}

export default function UserEdit() {
    const history = useHistory();
    const { user } = history.location.state as User;

    const [id] = useState(user.id);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [re_password, setRepassword] = useState('');
    const [loading, setLoading] = useState(false);

    const notify = () => showToast({ type: "info", message: "Confirme seu password" });



    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (password === re_password) {
            const data = {
                id,
                name,
                email,
                password
            }
            setLoading(true);
            await api.put('user', data).then(msg => {
                showToast({ type: "success", message: msg.data.message })
                setTimeout(() => {
                    history.push('/dashboard/users');
                }, 2000)
            }).catch(
                err => showToast((err.status === 400)
                    ? { type: "warn", message: err.response.data.error }
                    : { type: "error", message: err.response.data.error })
            );
        } else {
            notify();
        }
        setLoading(false);


    }

    return (
        <div id="page-edit-user">
            <Sidebar />
            <ToastAnimated />
            <main>
                <form onSubmit={handleSubmit} className="edit-user-form">
                    <fieldset>
                        <legend>Dados</legend>
                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                value={name}
                                onChange={event => setName(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="password">Senha</label>
                            <input
                                id="password"
                                value={password}
                                type="password"
                                onChange={event => setPassword(event.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="password">Confirme sua senha</label>
                            <input
                                id="re_password"
                                value={re_password}
                                type="password"
                                onChange={event => setRepassword(event.target.value)} />
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">

                        {!loading ? (
                            // <FiCheck size={24} color="#FFF" />
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
