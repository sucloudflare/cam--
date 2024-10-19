import React, { useState } from 'react';
import axios from 'axios';

function CookieConsent() {
  const [cookies, setCookies] = useState('');
  const [ip, setIp] = useState('');
  const [url, setUrl] = useState(window.location.href);
  const [consentGiven, setConsentGiven] = useState(false);

  const handleSaveData = async () => {
    try {
      // Obtenha o IP da API
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const userIp = ipResponse.data.ip;

      // Salve os dados no servidor
      const response = await axios.post('http://localhost:5000/save-cookies', {
        cookies,
        ip: userIp,
        url,
      });

      alert(response.data);
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
      alert('Erro ao salvar os dados');
    }
  };

  const handleConsent = () => {
    setConsentGiven(true);
    handleSaveData();
  };

  return (
    <div>
      {!consentGiven ? (
        <div style={{ marginTop: '20px' }}>
          <p>Este site usa cookies para melhorar sua experiência.</p>
          <button onClick={handleConsent}>Aceitar Cookies</button>
        </div>
      ) : (
        <div>
          <p>Obrigado por aceitar os cookies!</p>
          <p>Digite os cookies que deseja compartilhar:</p>
          <input
            type="text"
            value={cookies}
            onChange={(e) => setCookies(e.target.value)}
            placeholder="Insira seus cookies"
          />
          <button onClick={handleSaveData}>Salvar Cookies</button>
        </div>
      )}
    </div>
  );
}

export default CookieConsent;
