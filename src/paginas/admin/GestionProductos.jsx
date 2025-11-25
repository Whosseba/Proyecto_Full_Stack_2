import React, { useState, useMemo } from 'react';
import { useProductos } from '../../contextos/ContextoProductos';

const GestionProductos = () => {
  const { productos, agregarProducto, editarProducto, eliminarProducto } = useProductos();
  const [productoActual, setProductoActual] = useState({ nombre: '', precio: '', descripcion: '', categoria: '', imagen: '' });
  const [editandoId, setEditandoId] = useState(null);

  const modoEdicion = useMemo(() => editandoId !== null, [editandoId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen' && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductoActual({ ...productoActual, imagen: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setProductoActual({ ...productoActual, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modoEdicion) {
      editarProducto({ ...productoActual, id: editandoId });
    } else {
      agregarProducto(productoActual);
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
            <label className="form-label">Descripción</label>
            <textarea name="descripcion" value={productoActual.descripcion} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Categoría</label>
            <input name="categoria" value={productoActual.categoria} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Imagen</label>
            <input name="imagen" onChange={handleChange} type="file" className="form-control" accept="image/*" />
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
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(producto => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio}</td>
                  <td>{producto.categoria}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditar(producto)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
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