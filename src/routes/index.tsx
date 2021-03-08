import React from 'react';

import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import Loader from 'react-loader-spinner';


const Routes: React.FC = () => {
    const { signed, loading } = useAuth();

    if (loading) {
        return (
            <div
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#000',
                }}
            >
                <Loader type="Puff" color="#000" height={80} width={80} />
            </div>
        );
    }

    return (signed === true) ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;