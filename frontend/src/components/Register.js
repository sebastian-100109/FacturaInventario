import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Asegúrate de que este archivo existe con la R mayúscula

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contrasena: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica que todos los campos estén llenos
    if (!formData.nombre || !formData.email || !formData.contrasena) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    console.log('Datos de registro:', formData);
    navigate('/');
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
              />
            </div>

            <button type="submit" className="register-submit-button">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
