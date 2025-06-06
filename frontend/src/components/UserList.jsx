import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para obtener usuarios
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data.users || []);
      setError(null);
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Función para crear usuario
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await userService.createUser(newUser);
      setNewUser({ name: '', email: '' });
      fetchUsers(); // Recargar lista
    } catch (err) {
      setError('Error al crear usuario');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      
      {/* Formulario para crear usuario */}
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
          required
        />
        <button type="submit">Crear Usuario</button>
      </form>

      {/* Lista de usuarios */}
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;