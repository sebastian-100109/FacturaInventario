import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contrasena: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Verifica que todos los campos estén llenos
    if (!formData.nombre || !formData.email || !formData.contrasena) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    setIsLoading(true);

    try {
      // Preparar los datos para enviar al backend
      const userData = {
        email: formData.email,
        password: formData.contrasena,
        nombre: formData.nombre // Si tu backend acepta nombre adicional
      };

      console.log('Enviando datos:', userData);
      
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://facturainventario.onrender.com';
      
      const apiUrl = `${API_BASE_URL}/auth/register`;
      console.log('URL:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.text(); // Cambiar a text() para ver el error completo
        console.log('Error response:', errorData);
        throw new Error(errorData || `Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Usuario registrado exitosamente:', result);
      
      // Mostrar mensaje de éxito
      alert('¡Usuario registrado exitosamente!');
      
      // Redirigir al login
      navigate('/');
      
    } catch (error) {
      console.error('Error en el registro:', error);
      setError(error.message || 'Error al registrar usuario. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <>
      <div className="login-button-container">
        <button className="login-link-button" onClick={handleLoginClick}>
          Iniciar Sesión
        </button>
      </div>

      <div className="register-container">
        <div className="register-form">
          <img src="/images/logo.png" alt="Logo" className="logo" />
          <h1 style={{ color: "#ffffff" }}>Registro</h1>

          {error && (
            <div className="error-message" style={{ 
              color: '#ff4444', 
              backgroundColor: '#ffe6e6', 
              padding: '10px', 
              borderRadius: '5px', 
              marginBottom: '15px',
              border: '1px solid #ff4444'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                value={formData.nombre}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contrasena">Contraseña:</label>
              <input 
                type="password" 
                id="contrasena" 
                name="contrasena" 
                value={formData.contrasena}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="register-submit-button"
              disabled={isLoading}
              style={{
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;