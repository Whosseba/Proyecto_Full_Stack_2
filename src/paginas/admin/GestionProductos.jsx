import React, { useState, useMemo } from 'react';
import { useProductos } from '../../contextos/ContextoProductos'; 

const GestionProductos = () => {
  const { productos, agregarProducto, editarProducto, eliminarProducto } = useProductos();
  
  // Agregamos stock al estado inicial del formulario
  const [productoActual, setProductoActual] = useState({ nombre: '', precio: '', descripcion: '', categoria: '', imagen: '', stock: 0 });
  const [editandoId, setEditandoId] = useState(null);

  const modoEdicion = useMemo(() => editandoId !== null, [editandoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Manejar inputs numéricos (precio y stock)
    const newValue = (name === 'precio' || name === 'stock') ? parseFloat(value) : value;
    setProductoActual({ ...productoActual, [name]: newValue });
  };

  const handleEditar = (producto) => {
    setEditandoId(producto.id);
    setProductoActual(producto); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLimpiar = () => {
    setEditandoId(null);
    setProductoActual({ nombre: '', precio: '', descripcion: '', categoria: '', imagen: '', stock: 0 });
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto de la base de datos?")) {
      // Espera la respuesta del contexto (que se conecta al backend)
      await eliminarProducto(id); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (productoActual.precio <= 0 || productoActual.stock < 0) {
      alert("El precio y el stock deben ser valores positivos.");
      return;
    }

    const prodEnviar = { 
        ...productoActual
        // Ya no necesitamos parseFloat aquí porque handleChange lo hace.
    };

    let exito = false;

    if (modoEdicion) {
      exito = await editarProducto({ ...prodEnviar, id: editandoId });
      if (exito) alert("¡Producto actualizado exitosamente!");
    } else {
      exito = await agregarProducto(prodEnviar);
      if (exito) alert("¡Producto creado exitosamente!");
    }

    if (exito) handleLimpiar();
  };

  return (
    <div className="card text-white bg-dark border-secondary mb-5">
      <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
        <h4 className="mb-0">
            {modoEdicion ? `✏️ Editando Producto #${editandoId}` : '➕ Agregar Nuevo Producto'}
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
                {/* step="0.01" para permitir decimales en el formulario */}
                <input name="precio" value={productoActual.precio} onChange={handleChange} type="number" step="0.01" className="form-control" required />
            </div>
            {/* CAMPO: STOCK */}
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
                <label className="form-label">URL Imagen</label>
                <input name="imagen" value={productoActual.imagen} onChange={handleChange} type="text" className="form-control" placeholder="http://..." />
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

      <div className="card-footer bg-dark">
        <h5 className="mt-3">Inventario ({productos.length} productos)</h5>
        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th> {/* NUEVA COLUMNA */}
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
                    {/* Visualización de Stock con color */}
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