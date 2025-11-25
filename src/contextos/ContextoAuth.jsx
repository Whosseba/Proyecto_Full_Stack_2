import { createContext, useState, useContext } from "react";

export const ContextoAuth = createContext();

export const ProveedorAuth = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, nombre: 'Admin', email: 'admin@example.com', password: 'admin', rol: 'admin' },
    { id: 2, nombre: 'User', email: 'user@example.com', password: 'user', rol: 'user' }
  ]);

  const login = (userCredentials) => {
    const user = users.find(u => u.email === userCredentials.email && u.password === userCredentials.password);
    if (user) {
      setUsuario(user);
      return true;
    }
    return false;
  };
  //agregando cambio
  
  const logout = () => setUsuario(null);

  const eliminarUsuario = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const editarUsuario = (usuarioActualizado) => {
    setUsers(users.map(user => user.id === usuarioActualizado.id ? usuarioActualizado : user));
  };

  return (
    <ContextoAuth.Provider value={{ usuario, users, login, logout, eliminarUsuario, editarUsuario }}>
      {children}
    </ContextoAuth.Provider>
  );
};

export const useAuth = () => useContext(ContextoAuth);