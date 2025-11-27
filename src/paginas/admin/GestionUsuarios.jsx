import React, { useState } from 'react';
// La ruta ../../ sube dos niveles: de "admin" a "paginas", y de "paginas" a "src", donde encuentra "contextos"
import { useAuth } from '../../contextos/ContextoAuth';

const GestionUsuarios = () => {
  const { users, eliminarUsuario, editarUsuario, usuario: usuarioActual } = useAuth();
  const [editandoUsuario, setEditandoUsuario] = useState(null);

  const handleEditClick = (user) => {
    setEditandoUsuario({ ...user });
  };

  const handleCancelEdit = () => {
    setEditandoUsuario(null);
  };

  const handleSave = () => {
    editarUsuario(editandoUsuario);
    setEditandoUsuario(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditandoUsuario({ ...editandoUsuario, [name]: value });
  };

  const handleEliminar = (id) => {
      if(window.confirm("¿Estás seguro?")) {
          eliminarUsuario(id);
      }
  }

  return (
    <div className="card text-white bg-dark border-secondary">
      <div className="card-header bg-secondary text-white">
        <h3>Gestión de Usuarios</h3>
      </div>
      <div className="card-body">
        
        {users.length === 0 ? (
            <div className="alert alert-info">
                No hay usuarios para mostrar. (El Backend aún no tiene endpoints para listar usuarios ajenos).
            </div>
        ) : (
            <div className="table-responsive">
            <table className="table table-dark table-striped align-middle">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id || user.email}>
                    <td>{user.nombre || "Sin nombre"}</td>
                    <td>{user.email}</td>
                    <td>{user.rol}</td>
                    <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditClick(user)}>Editar</button>
                        {usuarioActual && usuarioActual.email !== user.email ? (
                        <button 
                            className="btn btn-sm btn-danger" 
                            onClick={() => handleEliminar(user.id)}
                        >
                            Eliminar
                        </button>
                        ) : (
                        <small className="text-muted">Actual</small>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
      </div>

      {editandoUsuario && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">Editar Usuario</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCancelEdit}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" name="nombre" className="form-control" value={editandoUsuario.nombre || ''} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={editandoUsuario.email} onChange={handleChange} readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rol</label>
                  <select name="rol" className="form-select" value={editandoUsuario.rol} onChange={handleChange}>
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer border-secondary">
                <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar Cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionUsuarios;