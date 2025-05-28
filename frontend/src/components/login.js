import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email, 'Password:', password);

    navigate('/dashboard');
    
    };


    const handleRegisterClick = () => {
        navigate('/registro');
    };

  
    return (
        
        <>
        <div className="login-button-container">
            <button
                className="register-button"
                onClick={handleRegisterClick}
            >
                Regístrate
            </button>
        </div>
        <div className="login-container">
                <div className="login-image">
                    <img src="/images/logo.png" alt="Login" className="logo" style={{ width: "150px" }} />
                </div>

                <h1 className='login-title'>Iniciar Sesión</h1>

                <div className="login-form-conteiner">
                    <form className='login-form' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Usuario: </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </div>

                        <a href="#" className="forgot-password">¿olvidaste tu contraseña?</a>

                        <button type="submit" className="sign-in-button">
                            Ingresar
                        </button>
                    </form>
                </div>
            </div></>
    );
}

export default Login;