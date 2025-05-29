import React, { useState, useEffect } from 'react';
import './ClientForm.css';

function ClientForm() {
    // Estado para los campos del formulario
    const [client, setClient] = useState({
        nombre: '',
        nit: '',
        direccion: '',
        correo: ''
    });

    // Estado para la lista de clientes
    const [clients, setClients] = useState([]);

    // Estado para la búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    // Estado para control de edición
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    // Cargar clientes del localStorage al iniciar
    useEffect(() => {
        const storedClients = localStorage.getItem('clients');
        if (storedClients) {
            setClients(JSON.parse(storedClients));
        }
    }, []);

    // Guardar clientes en localStorage cuando cambian
    useEffect(() => {
        localStorage.setItem('clients', JSON.stringify(clients));
    }, [clients]);

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    // Guardar cliente
    const saveClient = (e) => {
        e.preventDefault();

        if (!client.nombre || !client.nit) {
            alert('Por favor complete al menos nombre y NIT');
            return;
        }

        if (editing) {
            // Actualizar cliente existente
            const updatedClients = clients.map(c =>
                c.id === currentId ? { ...client, id: currentId } : c
            );
            setClients(updatedClients);
            setEditing(false);
            setCurrentId(null);
        } else {
            // Agregar nuevo cliente con ID único
            const newClient = { ...client, id: Date.now() };
            setClients([...clients, newClient]);
        }

        // Limpiar formulario
        setClient({ nombre: '', nit: '', direccion: '', correo: '' });
    };

    // Eliminar cliente
    const deleteClient = (id) => {
        if (window.confirm('¿Está seguro de eliminar este cliente?')) {
            setClients(clients.filter(client => client.id !== id));
        }
    };

    // Editar cliente
    const editClient = (client) => {
        setClient(client);
        setEditing(true);
        setCurrentId(client.id);
    };

    // Filtrar clientes según término de búsqueda
    const filteredClients = clients.filter(client =>
        client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.nit.includes(searchTerm)
    );

    return (
        <div className="client-container">
            <div className="client-form-container">
                <h2>{editing ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
                <form onSubmit={saveClient}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            id="nombre"
                            type="text"
                            name="nombre"
                            value={client.nombre}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre">NIT:</label>
                        <input
                            id="nit"
                            type="text"
                            name="nit"
                            value={client.nit}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre">Direccion:</label>
                        <input
                            id="direccion"
                            type="text"
                            name="direccion"
                            value={client.direccion}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            id="correo"
                            type="email"
                            name="correo"
                            value={client.correo}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit" className={editing ? "edit" : ""}>
                        {editing ? 'Actualizar' : 'Guardar'}
                    </button>

                    {editing && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditing(false);
                                setClient({ nombre: '', nit: '', direccion: '', correo: '' });
                            }}
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </div>

            <div className="client-list-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o NIT..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <h2>Lista de Clientes</h2>

                {filteredClients.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>NIT</th>
                                <th>Dirección</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map(client => (
                                <tr key={client.id}>
                                    <td>{client.nombre}</td>
                                    <td>{client.nit}</td>
                                    <td>{client.direccion}</td>
                                    <td>{client.correo}</td>
                                    <td>
                                        <button className="edit" onClick={() => editClient(client)}>Editar</button>
                                        <button className="delete" onClick={() => deleteClient(client.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay clientes que mostrar</p>
                )}
            </div>
        </div>
    );
}

export default ClientForm;