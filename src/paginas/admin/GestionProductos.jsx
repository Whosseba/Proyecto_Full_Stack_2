import React, { useState, useMemo } from 'react';
import { useProductos } from '../../contextos/ContextoProductos'; 
// Asegúrate de que ContextoProductos.jsx ya está modificado para usar FormData

const GestionProductos = () => {
    const { productos, agregarProducto, editarProducto, eliminarProducto } = useProductos();
    
    const [productoActual, setProductoActual] = useState({ 
        nombre: '', 
        precio: '', 
        descripcion: '', 
        categoria: '', 
        stock: 0 
    });

    // Estado para manejar el archivo binario seleccionado
    const [imagenArchivo, setImagenArchivo] = useState(null); 
    const [editandoId, setEditandoId] = useState(null);

    const modoEdicion = useMemo(() => editandoId !== null, [editandoId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = (name === 'precio' || name === 'stock') ? parseFloat(value) : value;
        setProductoActual({ ...productoActual, [name]: newValue });
    };

    // Maneja la selección del archivo de imagen
    const handleFileChange = (e) => {
        setImagenArchivo(e.target.files[0] || null);
    };

    const handleEditar = (producto) => {
        setEditandoId(producto.id);
        // Cuando se edita, cargamos todos los campos del producto (incluida la 'imagen' que es el nombre de archivo)
        setProductoActual(producto); 
        // Es crucial limpiar el campo de archivo para que el usuario pueda subir uno nuevo o dejarlo vacío
        setImagenArchivo(null); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLimpiar = () => {
        setEditandoId(null);
        // Asegúrate de limpiar 'imagen' y usar stock: 0 en el estado inicial
        setProductoActual({ nombre: '', precio: '', descripcion: '', categoria: '', stock: 0 }); 
        setImagenArchivo(null); // Limpiamos el archivo seleccionado
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

        //LÓGICA CLAVE: CREACIÓN DE FormData (para texto + archivo)
        const formData = new FormData();
        
        // 1. Añadir campos de texto al FormData
        Object.keys(productoActual).forEach(key => {
            // Manejar 'imagen' de la DB (el nombre del archivo) solo si existe y estamos editando
            if (key === 'imagen' && modoEdicion && productoActual.imagen) {
                 formData.append(key, productoActual[key]);
            } else if (key !== 'imagen') {
                 formData.append(key, productoActual[key] === null ? '' : productoActual[key]);
            }
        });
        
        // 2. Añadir el archivo de imagen (solo si el usuario seleccionó uno)
        if (imagenArchivo) {
            formData.append('imagen', imagenArchivo);
        }

        let exito = false;

        if (modoEdicion) {
            // Pasamos el ID y el objeto FormData completo.
            exito = await editarProducto(editandoId, formData); 
            if (exito) alert("¡Producto actualizado exitosamente!");
        } else {
            // Pasamos el objeto FormData
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
                        {/* INPUTS DE TEXTO Y NÚMERO */}
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
                        
                        {/* CAMPO IMAGEN (FILE INPUT) */}
                        <div className="col-12 mb-3">
                            <label className="form-label">Imagen {modoEdicion && ' (Dejar vacío para no cambiar la actual)'}</label>
                            <input 
                                name="imagen" 
                                onChange={handleFileChange} 
                                type="file" // <-- Campo de archivo
                                accept="image/*" 
                                className="form-control" 
                            />
                            {/* Mostrar el nombre del archivo actual si estamos editando */}
                            {modoEdicion && productoActual.imagen && 
                                <p className="mt-2 text-info">
                                    Archivo actual en DB: **{productoActual.imagen}**
                                </p>}
                        </div>
                        
                        <div className="col-12 mb-3">
                            <label className="form-label">Descripción</label>
                            <textarea name="descripcion" value={productoActual.descripcion} onChange={handleChange} className="form-control" rows="2" />
                        </div>
                    </div>
                    
                    <div className="d-grid gap-2">
                        <button type="submit" className={`btn ${modoEdicion ? 'btn-warning' : 'btn-success'}`}>
                            {modoEdicion ? 'Guardar Cambios' : 'Crear Producto'}
                        </button>
                    </div>
                </form>
            </div>

            {/* TABLA DE LISTADO DE PRODUCTOS */}
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
                            {/* Mapeamos la lista de productos del contexto */}
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