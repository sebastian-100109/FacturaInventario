import axios from 'axios';

// Configuración base de axios
const API = axios.create({
  baseURL: 'http://localhost:8000/api', // URL de tu FastAPI
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores global
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error de API:', error);
    return Promise.reject(error);
  }
);

// Funciones para consumir la API
export const userService = {
  // GET - Obtener usuarios
  getUsers: async () => {
    try {
      const response = await API.get('/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST - Crear usuario
  createUser: async (userData) => {
    try {
      const response = await API.post('/users', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT - Actualizar usuario
  updateUser: async (id, userData) => {
    try {
      const response = await API.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE - Eliminar usuario
  deleteUser: async (id) => {
    try {
      const response = await API.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default API;