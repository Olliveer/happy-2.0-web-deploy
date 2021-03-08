import React, { useEffect, useState } from 'react';
import { FiEdit3, FiPlus, FiTrash } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Sidebar from '../../components/Sidebar';
import placeHolder from '../../images/placeHolder.svg';
import api from '../../services/api';
import ToastAnimated, { showToast } from '../../utils/Toast/toast';
import './users.css';

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
}

function User() {
    const history = useHistory();
    const [users, setUsers] = useState<IUser[]>([]);
    const [refresh, setRefresh] = useState(0);

    const notify = () =>
        showToast({ type: "info", message: 'Não existem usuários cadastrados' });

    useEffect(() => {
        api.get('users').then(response => {
            setUsers(response.data);
        })
    }, [refresh]);

    const delAlert = (id: string) => {
        swal({
            title: 'Deletar usuário',
            text: 'Tem certeza que quer deletar esse usuário?',
            icon: 'warning',
            buttons: ['Não', 'Sim']
        }).then(res => {
            if (res) {
                api.post(`user/delete/${id}`).then(() => setRefresh(refresh + 1));
                swal({ text: 'Usuário deletado com sucesso', icon: 'success', timer: 2000 })
            } else {
                history.push('/dashboard/users');
            }
        })
    }

    if (!users) {
        notify();
    }

    return (
        <div id="page-users">
            <Sidebar />
            <ToastAnimated />
            <main className="content-wrapper">
                <h1>Usuarios Cadastrados</h1>

                <table id="table">
                    <thead>
                        <tr>
                            {/* <th>&nbsp;</th> */}
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ações</th>
                            {/* <th>&nbsp;</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <div className="img-td">
                                        <img className="img" src={placeHolder} alt="PlaceUser" />
                                        <span>{user.name}</span>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <div className="buttons-td">
                                        <Link to={{ pathname: '/dashboard/user/edit', state: { user } }}                                    >
                                            <FiEdit3 size={20} color="#15C3D6" />
                                        </Link>
                                        <button className="button-del-user" onClick={() => delAlert(user.id)}>
                                            <FiTrash size={20} color="#ff9e9e" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </main>
            <Link to="/dashboard/user/create" className="button-register">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default User;