import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoImg from '../../images/logo.svg';
import { motion } from 'framer-motion';
import './landing.css';


function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">

                <motion.img
                    animate={{ scale: [1, 1.5, 1.5, 1] }}
                    transition={{ duration: 0.8 }}
                    src={logoImg}
                    alt="Happy"
                />

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>

                <div className="location">
                </div>

                <Link to="/login" className="enter-login">
                    <strong>Área restrita</strong>
                </Link>

                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
                </Link>


            </div>
        </div>
    );
}

export default Landing;