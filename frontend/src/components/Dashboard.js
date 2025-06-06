import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {

    const navigate = useNavigate();
  
  const handleNavigation = (path) => {
    navigate(path);
  };

    return (
        <div className="dashboard-container">
            <div className="sidebar">

               <button className="menu-button" onClick={() => handleNavigation('/inventario')}>inventario</button>
                <button className="menu-button" onClick={() => handleNavigation('/facturar')}>facturar</button>
                <button className="menu-button" onClick={() => handleNavigation('/clientForm')}>clientes</button>
                <button className="menu-button" onClick={() => handleNavigation('/products')}>productos</button>
                <button className="menu-button" onClick={() => handleNavigation('/ayuda')}>Ayuda</button>
                <button className="menu-button" onClick={() => handleNavigation('/soporte')}>soporte</button>

            </div>
            <div className="main-content">
                <div className="logo-container">
                    <div className="logo-circle">
                        <img src="/images/logo.png" alt="Robot" className="logo-image" />
                    </div>
                  
                </div>
            </div>
        </div>
    );
}

export default Dashboard;