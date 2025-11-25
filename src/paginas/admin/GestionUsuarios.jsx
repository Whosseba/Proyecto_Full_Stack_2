import React, { useState } from 'react';
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

  return (
    <div className="card text-white bg-dark">
      <div className="card-header">
        <h3>Gestión de Usuarios</h3>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-dark table-striped">
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
                <tr key={user.id}>
                  <td>{user.nombre}</td>
                  <td>{user.email}</td>
                  <td>{user.rol}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditClick(user)}>Editar</button>
                    {usuarioActual && usuarioActual.id !== user.id ? (
                      <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => eliminarUsuario(user.id)}
                      >
                        Eliminar
                      </button>
                    ) : (
                      <small className="text-muted">No se puede eliminar al usuario actual</small>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editandoUsuario && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Editar Usuario</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCancelEdit}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" name="nombre" className="form-control" value={editandoUsuario.nombre} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={editandoUsuario.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rol</label>
                  <select name="rol" className="form-select" value={editandoUsuario.rol} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
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