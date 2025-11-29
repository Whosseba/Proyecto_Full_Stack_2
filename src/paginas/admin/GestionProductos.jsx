import React, { useState, useMemo } from 'react';
import { useProductos } from '../../contextos/ContextoProductos';

const GestionProductos = () => {
  const { productos, agregarProducto, editarProducto, eliminarProducto } = useProductos();
  
  const [productoActual, setProductoActual] = useState({ nombre: '', precio: '', descripcion: '', categoria: '', imagen: '' });
  const [editandoId, setEditandoId] = useState(null);

  const modoEdicion = useMemo(() => editandoId !== null, [editandoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoActual({ ...productoActual, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convertimos precio a número para Java
    const prodEnviar = { ...productoActual, precio: parseFloat(productoActual.precio) };

    if (modoEdicion) {
      await editarProducto({ ...prodEnviar, id: editandoId });
      alert("¡Producto actualizado!");
    } else {
      await agregarProducto(prodEnviar);
      alert("¡Producto creado!");
    }
    handleLimpiar();
  };

  const handleEditar = (producto) => {
    setEditandoId(producto.id);
    setProductoActual(producto);
  };

  const handleLimpiar = () => {
    setEditandoId(null);
    setProductoActual({ nombre: '', precio: '', descripcion: '', categoria: '', imagen: '' });
  };

  return (
    <div className="card text-white bg-dark">
      <div className="card-header">
        <h3>{modoEdicion ? 'Editar Producto' : 'Agregar Producto'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input name="nombre" value={productoActual.nombre} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input name="precio" value={productoActual.precio} onChange={handleChange} type="number" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Categoría</label>
            <select name="categoria" value={productoActual.categoria} onChange={handleChange} className="form-control" required>
                <option value="">Seleccione...</option>
                <option value="laptops">Laptops</option>
                <option value="mouses">Mouses</option>
                <option value="teclados">Teclados</option>
                <option value="monitores">Monitores</option>
                <option value="gabinetes">Gabinetes</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">URL Imagen</label>
            {/* Usamos input text para URL*/}
            <input name="imagen" value={productoActual.imagen} onChange={handleChange} type="text" className="form-control" placeholder="http://..." />
            <small className="text-muted">Pega el link de una imagen de internet</small>
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea name="descripcion" value={productoActual.descripcion} onChange={handleChange} className="form-control" />
          </div>
          
          <button type="submit" className="btn btn-primary me-2">{modoEdicion ? 'Actualizar' : 'Agregar'}</button>
          {modoEdicion && <button type="button" className="btn btn-secondary" onClick={handleLimpiar}>Cancelar</button>}
        </form>
      </div>
      
      <div className="card-footer">
        <h4>Listado de Productos</h4>
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Img</th><th>Nombre</th><th>Precio</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(prod => (
                <tr key={prod.id}>
                  <td><img src={prod.imagen} width="40" alt="prod" onError={(e)=>e.target.style.display='none'}/></td>
                  <td>{prod.nombre}</td>
                  <td>${prod.precio}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditar(prod)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={() => {
                      if(window.confirm(`¿Seguro que deseas eliminar "${prod.nombre}"?`)){
                        eliminarProducto(prod.id);
                      }
                    }}
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