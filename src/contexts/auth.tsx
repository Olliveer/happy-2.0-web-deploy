import React, { createContext, useContext, useEffect, useState } from 'react';
import * as auth from '../services/auth';
import api from '../services/api';

interface AuthContextData {
    signed: boolean;
    token: string | null;
    loading: boolean;
    signIn(email: string, password: string): Promise<void>;
    signOut(): void;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const storageToken = localStorage.getItem('web:token');
    //     console.log('GET TOKEN -> ', storageToken);
    //     if (storageToken) {
    //         api.defaults.headers.Authorization = `Bearer ${storageToken}`;
    //         setToken(storageToken);
    //     }
    //     setLoading(false);
    // }, []);

    useEffect(() => {
        async function loadStorageData() {
            const storageToken = await localStorage.getItem('web:token');

            if (storageToken) {
                api.defaults.headers.Authorization = `Bearer ${storageToken}`;
                setToken(storageToken);

            }
            setLoading(false);
        }
        loadStorageData();
    }, []);

    async function signIn(username: string, password: string) {
        const response = await auth.SignInService(username, password);

        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        setToken(response.data.token);
        localStorage.setItem('web:token', response.data.token);
    }

    function signOut() {
        auth.signOut();
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ signed: Boolean(token), token, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}
