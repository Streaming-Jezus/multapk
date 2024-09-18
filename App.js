import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [content, setContent] = useState([]);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/content', {
          headers: { 'x-api-key': apiKey }
        });
        setContent(response.data);
      } catch (error) {
        console.log('Error al obtener el contenido', error);
      }
    };

    if (apiKey) {
      fetchContent();
    }
  }, [apiKey]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: 'usuario@example.com',
        password: 'contraseña'
      });
      setApiKey(response.data.token);
    } catch (error) {
      console.log('Error al iniciar sesión', error);
    }
  };

  return (
    <div>
      <h1>Catálogo de Películas y Series</h1>
      <button onClick={handleLogin}>Iniciar Sesión</button>
      <ul>
        {content.map(item => (
          <li key={item._id}>
            {item.title} - {item.genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
