import { createContext, useContext, useState, useEffect } from "react";

const ContextoAuth = createContext();

export const useAuth = () => {
  const context = useContext(ContextoAuth);
  if (!context) throw new Error("useAuth debe usarse dentro de un ProviderAuth");
  return context;
};

export const ProviderAuth = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [usuario, setUsuario] = useState(null);
  const [autenticado, setAutenticado] = useState(false);

  // EFECTO: Verificar si ya hay un token guardado al recargar la página
  // (Esto cumple el requisito IE3.3.2 de persistencia de sesión)
  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");
    if (tokenGuardado) {
      setToken(tokenGuardado);
      setAutenticado(true);
      // Aquí podrías decodificar el token para sacar el nombre del usuario si quisieras
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Enviamos usuario/clave
      });

      if (!response.ok) throw new Error("Credenciales incorrectas");

      const tokenRecibido = await response.text(); // El backend devuelve el token como texto plano

      // 1. Guardamos en el estado de React
      setToken(tokenRecibido);
      setAutenticado(true);
      
      // 2. Guardamos en LocalStorage (Persistencia)
      localStorage.setItem("token", tokenRecibido);
      
      return true; // Login exitoso
    } catch (error) {
      console.error(error);
      return false; // Login fallido
    }
  };

  const logout = () => {
    setToken(null);
    setAutenticado(false);
    setUsuario(null);
    localStorage.removeItem("token"); // Borramos el token del navegador
  };

  return (
    <ContextoAuth.Provider value={{ token, autenticado, login, logout }}>
      {children}
    </ContextoAuth.Provider>
  );
};