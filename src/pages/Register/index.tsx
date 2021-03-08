import React, { FormEvent, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import api from '../../services/api';
import ToastAnimated, { showToast } from '../../utils/Toast/toast';
import './register.css';

export default function Register() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRepassword] = useState('');

    const notify = () => showToast({ type: "info", message: "Confirme seu password" });
    const notifyForm = () => showToast({ type: "warn", message: "Preencha os campos" });



    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (password === re_password) {
            const data = {
                name: name,
                email: email,
                password: password
            }
            if (name === '' || email === '' || password === '') {
                notifyForm();
            }

            await api.post('register', data).then(msg => {
                showToast({ type: "success", message: msg.data.msg })
                setTimeout(() => {
                    history.push('/dashboard/users');
                }, 2000)
            })
                .catch(err => {
                    showToast({ type: "error", message: err.response.data.error })
                    history.push('/dashboard/user/create');
                });

        } else {
            history.push('/dashboard/user/create');
            notify();
        }
    }

    return (
        <div id="page-create-user">
            <Sidebar />
            <ToastAnimated />
            <main>
                <form onSubmit={handleSubmit} className="create-user-form">
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
                        <FiCheck size={24} color="#FFF" />
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    );
}
