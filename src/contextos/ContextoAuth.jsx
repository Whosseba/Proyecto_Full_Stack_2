import { createContext, useState, useContext } from "react";

export const ContextoAuth = createContext();

export const ProveedorAuth = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const login = (user) => setUsuario(user);
  const logout = () => setUsuario(null);

  return (
    <ContextoAuth.Provider value={{ usuario, login, logout }}>
      {children}
    </ContextoAuth.Provider>
  );
};

export const useAuth = () => useContext(ContextoAuth);
