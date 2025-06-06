// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const email = localStorage.getItem('user_email');

        if (token && email) {
            setIsAuthenticated(true);
            setUser({ email });
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('user_email');
        setIsAuthenticated(false);
        setUser(null);
    };

    
    return { isAuthenticated, user, logout };
};