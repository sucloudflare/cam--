// src/CookieComponent.js

import React, { useState } from 'react';
import axios from 'axios';

const CookieComponent = () => {
    const [isPermissionGranted, setIsPermissionGranted] = useState(false);
    const [message, setMessage] = useState('');

    const handlePermission = () => {
        // Simula a solicitação de permissão
        const granted = window.confirm("Este site deseja acessar seus cookies e IP. Você permite?");
        setIsPermissionGranted(granted);

        if (granted) {
            saveData();
        }
    };

    const saveData = () => {
        const cookies = document.cookie; // Obtém os cookies
        const ip = ''; // Aqui você pode integrar uma API para obter o IP do usuário
        const url = window.location.href;

        // Envia os dados para o backend
        axios.post('http://localhost:5000/save-cookies', { cookies, ip, url })
            .then(response => {
                setMessage(response.data);
            })
            .catch(error => {
                console.error('Erro ao salvar os dados:', error);
                setMessage('Erro ao salvar os dados.');
            });
    };

    return (
        <div>
            <h1>Bem-vindo ao Submundo da Internet!</h1>
            <button onClick={handlePermission}>
                {isPermissionGranted ? "Permissão Concedida" : "Pedir Permissão"}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CookieComponent;
