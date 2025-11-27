import { createContext, useState, useContext } from "react";

export const ContextoAuth = createContext();

export const ProviderAuth = ({ children }) => {
  // Estado inicial leyendo del navegador 
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  
  // Si hay token, el usuario está autenticado
  const [autenticado, setAutenticado] = useState(!!localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(null);

  // FUNCIÓN LOGIN REAL (Conectada a Spring Boot)
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) return false;

      // El backend devuelve: { "token": "...", "role": "ADMIN" }
      const data = await response.json(); 

      setToken(data.token);
      setRole(data.role);
      setAutenticado(true);
      setUsuario({ email, rol: data.role });

      // Guardamos en LocalStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      
      return true;
    } catch (error) {
      console.error("Error en login:", error);
      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    setToken(null);
    setRole(null);
    setAutenticado(false);
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  // --- Placeholders para evitar errores en GestionUsuarios ---
  // (Dejamos esto vacío porque el backend actual no gestiona usuarios extra todavía)
  const users = []; 
  const eliminarUsuario = (id) => console.log("Falta endpoint DELETE en backend");
  const editarUsuario = (u) => console.log("Falta endpoint PUT en backend");

  return (
    <ContextoAuth.Provider value={{ 
      usuario, 
      users, 
      token, 
      role, 
      autenticado, 
      login, 
      logout, 
      eliminarUsuario, 
      editarUsuario 
    }}>
      {children}
    </ContextoAuth.Provider>
  );
};

export const useAuth = () => useContext(ContextoAuth);