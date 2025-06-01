// src/components/ProtectedRoute.js
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    
    return isAuthenticated ? children : <Navigate to="/" />;
};