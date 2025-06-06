// src/services/fetchApi.js
const BASE_URL = 'http://localhost:8000/api';

export const fetchService = {
  getUsers: async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) throw new Error('Error en la petición');
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Error en la petición');
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
};