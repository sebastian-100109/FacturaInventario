import React, { useState } from 'react';
import './ProductForm.css'; // Archivo CSS actualizado

function ProductForm() {
    // Estado para el formulario
    const [formData, setFormData] = useState({
        id: '',
        description: '',
        price: ''
    });

    // Estado para la lista de productos
    const [products, setProducts] = useState([
        { id: '01', description: 'salchichas', price: 12.00 }
    ]);

    // Estado para búsqueda
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Guardar producto
    const handleSave = (e) => {
        e.preventDefault();

        // Validación básica
        if (!formData.id || !formData.description || !formData.price) {
            alert('Por favor completa todos los campos');
            return;
        }

        // Verificar si el ID ya existe
        const exists = products.some(product => product.id === formData.id);
        if (exists) {
            alert('Ya existe un producto con ese ID');
            return;
        }

        // Añadir el nuevo producto
        const newProduct = {
            id: formData.id,
            description: formData.description,
            price: parseFloat(formData.price)
        };

        setProducts([...products, newProduct]);

        // Limpiar el formulario
        setFormData({
            id: '',
            description: '',
            price: ''
        });
    };

    // Buscar producto
    const handleSearch = (e) => {
        e.preventDefault();
        const product = products.find(p => p.id === searchId);
        setSearchResult(product || null);

        if (!product) {
            alert('Producto no encontrado');
        }
    };

    // Eliminar producto
    const handleDelete = (id) => {
        const confirmed = window.confirm('¿Estás seguro de eliminar este producto?');
        if (confirmed) {
            const updatedProducts = products.filter(product => product.id !== id);
            setProducts(updatedProducts);

            // Si el producto eliminado era el que se estaba mostrando en la búsqueda, limpiar resultado
            if (searchResult && searchResult.id === id) {
                setSearchResult(null);
                setSearchId('');
            }
        }
    };

    return (
        <div className="product-manager">
            <h2>Gestión de Productos</h2>

            <div className="product-layout-three-columns">
                {/* COLUMNA IZQUIERDA: Lista de productos */}
                <div className="product-list-container column">
                    <h3>Lista de Productos</h3>
                    {products.length === 0 ? (
                        <p>No hay productos registrados</p>
                    ) : (
                        <div className="table-container">
                            <table className="product-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.description}</td>
                                            <td>${product.price.toFixed(2)}</td>
                                            <td>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(product.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* COLUMNA CENTRAL: Formulario para añadir productos */}
                <div className="product-form-container column">
                    <div className="product-form">
                        <h3>Añadir Nuevo Producto</h3>
                        <form onSubmit={handleSave}>
                            <div className="form-group">
                                <label>ID:</label>
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Descripción:</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>

                            <button type="submit" className="save-btn">Guardar Producto</button>
                        </form>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Buscador de productos */}
                <div className="product-search-container column">
                    <div className="product-search">
                        <h3>Buscar Producto</h3>
                        <form onSubmit={handleSearch}>
                            <div className="form-group">
                                <label>Buscar por ID:</label>
                                <input
                                    type="text"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="search-btn">Buscar</button>
                        </form>

                        {/* Resultado de búsqueda */}
                        {searchResult && (
                            <div className="search-result">
                                <h4>Resultado:</h4>
                                <div className="product-card">
                                    <p><strong>ID:</strong> {searchResult.id}</p>
                                    <p><strong>Descripción:</strong> {searchResult.description}</p>
                                    <p><strong>Precio:</strong> ${searchResult.price.toFixed(2)}</p>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(searchResult.id)}
                                    >
                                        Eliminar Producto
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;