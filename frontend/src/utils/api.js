// src/utils/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API_VERSION = process.env.REACT_APP_API_VERSION || '/api/v1';

export const apiCall = async (endpoint, options = {}) => {
    const token = localStorage.getItem('access_token');
    const tokenType = localStorage.getItem('token_type') || 'bearer';

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `${tokenType} ${token}` }),
            ...options.headers,
        },
    };

    const response = await fetch(`${API_BASE_URL}${API_VERSION}${endpoint}`, config);
    
    if (!response.ok) {
        if (response.status === 401) {
            // Token expirado, redirigir al login
            localStorage.clear();
            window.location.href = '/';
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
};