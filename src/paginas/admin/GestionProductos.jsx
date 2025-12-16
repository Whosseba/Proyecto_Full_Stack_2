import React, { useState, useMemo } from 'react';
import { useProductos } from '../../contextos/ContextoProductos';

const GestionProductos = () => {
    const { productos, agregarProducto, editarProducto, eliminarProducto } = useProductos();
    
    const [productoActual, setProductoActual] = useState({ 
        nombre: '', 
        precio: '', 
        descripcion: '', 
        categoria: '', 
        stock: 0,
        especificaciones: ''
    });

    const [imagenArchivo, setImagenArchivo] = useState(null); 
    const [editandoId, setEditandoId] = useState(null);

    const modoEdicion = useMemo(() => editandoId !== null, [editandoId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = (name === 'precio' || name === 'stock') ? parseFloat(value) : value;
        setProductoActual({ ...productoActual, [name]: newValue });
    };

    const handleFileChange = (e) => {
        setImagenArchivo(e.target.files[0] || null);
    };

    const handleEditar = (producto) => {
        setEditandoId(producto.id);
        setProductoActual(producto); 
        setImagenArchivo(null); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLimpiar = () => {
        setEditandoId(null);
        setProductoActual({ nombre: '', precio: '', descripcion: '', categoria: '', stock: 0, especificaciones: '' }); 
        setImagenArchivo(null);
    };

    const handleEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto (y su imagen) de la base de datos?")) {
            await eliminarProducto(id); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (productoActual.precio <= 0 || productoActual.stock < 0) {
            alert("El precio y el stock deben ser valores positivos.");
            return;
        }

        const formData = new FormData();
        
        Object.keys(productoActual).forEach(key => {
            if (key === 'imagen' && modoEdicion && productoActual.imagen) {
                 formData.append(key, productoActual[key]);
            } else if (key !== 'imagen') {
                 formData.append(key, productoActual[key] === null ? '' : productoActual[key]);
            }
        });
        
        if (imagenArchivo) {
            formData.append('imagen', imagenArchivo);
        }

        let exito = false;

        if (modoEdicion) {
            exito = await editarProducto(editandoId, formData); 
            if (exito) alert("¡Producto actualizado exitosamente!");
        } else {
            exito = await agregarProducto(formData); 
            if (exito) alert("¡Producto creado exitosamente!");
        }

        if (exito) handleLimpiar();
    };

    return (
        <div className="card text-white bg-dark border-secondary mb-5">
            <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                    {modoEdicion ? `Editando Producto #${editandoId}` : 'Agregar Nuevo Producto'}
                </h4>
                {modoEdicion && (
                    <button className="btn btn-sm btn-light" onClick={handleLimpiar}>
                        Cancelar Edición
                    </button>
                )}
            </div>
            
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Nombre</label>
                            <input name="nombre" value={productoActual.nombre} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Precio</label>
                            <input name="precio" value={productoActual.precio} onChange={handleChange} type="number" step="0.01" className="form-control" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Stock</label>
                            <input name="stock" value={productoActual.stock} onChange={handleChange} type="number" min="0" className="form-control" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Categoría</label>
                            <select name="categoria" value={productoActual.categoria} onChange={handleChange} className="form-select" required>
                                <option value="">Seleccione...</option>
                                <option value="laptops">Laptops</option>
                                <option value="mouses">Mouses</option>
                                <option value="teclados">Teclados</option>
                                <option value="monitores">Monitores</option>
                                <option value="gabinetes">Gabinetes</option>
                            </select>
                        </div>
                        
                        <div className="col-12 mb-3">
                            <label className="form-label">Imagen {modoEdicion && ' (Dejar vacío para no cambiar la actual)'}</label>
                            <input 
                                name="imagen" 
                                onChange={handleFileChange} 
                                type="file"
                                accept="image/*" 
                                className="form-control" 
                            />
                            {modoEdicion && productoActual.imagen && 
                                <p className="mt-2 text-info">
                                    Archivo actual en DB: **{productoActual.imagen}**
                                </p>}
                        </div>
                        
                        <div className="col-12 mb-3">
                            <label className="form-label">Descripción</label>
                            <textarea name="descripcion" value={productoActual.descripcion} onChange={handleChange} className="form-control" rows="2" />
                        </div>

                        <div className="col-12 mb-3">
                            <label className="form-label">Especificaciones</label>
                            <textarea name="especificaciones" value={productoActual.especificaciones || ''} onChange={handleChange} className="form-control" rows="3" placeholder="Añade especificaciones, separadas por comas si son varias." />
                        </div>
                    </div>
                    
                    <div className="d-grid gap-2">
                        <button type="submit" className={`btn ${modoEdicion ? 'btn-warning' : 'btn-success'}`}>
                            {modoEdicion ? 'Guardar Cambios' : 'Crear Producto'}
                        </button>
                    </div>
                </form>
            </div>
            <div className="col-12 mb-3">
                            <label className="form-label">Especificaciones (Formato JSON o texto simple)</label>
                            <textarea 
                                name="especificaciones" 
                                value={productoActual.especificaciones} 
                                onChange={handleChange} 
                                className="form-control" 
                                rows="3" // Unas filas extra para texto largo
                            />
                        </div>
            <div className="card-footer bg-dark">
                <h5 className="mt-3">Inventario ({productos.length} productos)</h5>
                <div className="table-responsive">
                    <table className="table table-dark table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(prod => (
                                <tr key={prod.id}>
                                    <td>{prod.id}</td>
                                    <td>{prod.nombre}</td>
                                    <td>${prod.precio?.toLocaleString()}</td>
                                    <td>
                                        <span className={`badge ${prod.stock > 10 ? 'bg-success' : prod.stock > 0 ? 'bg-warning' : 'bg-danger'}`}>
                                            {prod.stock}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-outline-warning me-2" 
                                            onClick={() => handleEditar(prod)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-outline-danger" 
                                            onClick={() => handleEliminar(prod.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GestionProductos;