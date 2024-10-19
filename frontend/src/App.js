// src/App.js
import React, { useRef, useEffect } from 'react';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const getVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    };
    getVideo();
  }, []);

  const captureImage = async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    // Define o tamanho do canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Desenha o vídeo no canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Converte o canvas em uma imagem e envia para o backend
    const imageData = canvas.toDataURL('image/jpeg');

    try {
      await fetch('http://localhost:5000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });
      console.log('Imagem enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar a imagem:', error);
    }
  };

  return (
    <div>
      {/* O vídeo não é exibido para o usuário */}
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button onClick={captureImage}>Capturar Imagem</button>
    </div>
  );
}

export default App;
