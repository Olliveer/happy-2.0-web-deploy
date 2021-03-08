import React from 'react';
import LogoLogin from '../../images/logoHappy.svg';
import { motion } from 'framer-motion';
import './page-login.css';

function PageLogin() {
    return (
        <aside className="page-login">

            <motion.img
                animate={{ scale: [1, 1.5, 1.5, 1] }}
                transition={{ duration: 0.8 }}
                src={LogoLogin}
                alt="Happy"
            />


            <div className="location">
                <strong>Curitiba</strong>
                <span>Paraná</span>
            </div>
        </aside>
    );
}

export default PageLogin;