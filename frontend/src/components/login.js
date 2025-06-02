import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        setIsLoading(true);

        try {
            // Preparar los datos para OAuth2PasswordRequestForm
            // FastAPI espera 'username' y 'password' como form-data
            const formData = new FormData();
            formData.append('username', email); 
            formData.append('password', password);

            console.log('Enviando datos de login:', { username: email, password: '***' });

            // Usar variable de entorno o valor por defecto
            const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://facturainventario.onrender.com';
            const apiUrl = `${API_BASE_URL}/auth/login`;
            
            console.log('URL de login:', apiUrl);

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData // Enviar como FormData, no JSON
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.text();
                console.log('Error response:', errorData);
                
                // Manejar diferentes tipos de errores
                if (response.status === 401) {
                    throw new Error('Email o contraseña incorrectos');
                } else if (response.status === 422) {
                    throw new Error('Datos de login inválidos');
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            }

            const result = await response.json();
            console.log('Login exitoso:', result);

            // Guardar el token en localStorage o sessionStorage
            if (result.access_token) {
                localStorage.setItem('access_token', result.access_token);
                localStorage.setItem('token_type', result.token_type || 'bearer');
                
                // También puedes guardar información del usuario si la necesitas
                localStorage.setItem('user_email', email);
            }

            // Redirigir al dashboard
            navigate('/dashboard');

        } catch (error) {
            console.error('Error en el login:', error);
            setError(error.message || 'Error al iniciar sesión. Intente nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegisterClick = () => {
        navigate('/registro');
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        // Limpiar error cuando el usuario empiece a escribir
        if (error) setError('');
    };

    return (
        <>
            <div className="login-button-container">
                <button
                    className="register-button"
                    onClick={handleRegisterClick}
                    disabled={isLoading}
                >
                    Regístrate
                </button>
            </div>
            <div className="login-container">
                <div className="login-image">
                    <img src="/images/logo.png" alt="Login" className="logo" style={{ width: "150px" }} />
                </div>

                <h1 className='login-title'>Iniciar Sesión</h1>

                {error && (
                    <div className="error-message" style={{ 
                        color: '#ff4444', 
                        backgroundColor: '#ffe6e6', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        marginBottom: '15px',
                        border: '1px solid #ff4444',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <div className="login-form-conteiner">
                    <form className='login-form' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Usuario: </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleInputChange(setEmail)}
                                required 
                                disabled={isLoading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handleInputChange(setPassword)}
                                required 
                                disabled={isLoading}
                            />
                        </div>

                        <a className="forgot-password">¿olvidaste tu contraseña?</a>

                        <button 
                            type="submit" 
                            className="sign-in-button"
                            disabled={isLoading}
                            style={{
                                opacity: isLoading ? 0.7 : 1,
                                cursor: isLoading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isLoading ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;