import { createContext, useState, useContext, useEffect } from "react";

export const ContextoAuth = createContext();

export const ProveedorAuth = ({ children }) => {
  // Estados de autenticación
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [autenticado, setAutenticado] = useState(false); // Empieza en false
  const [inicializando, setInicializando] = useState(true); // Controla la carga inicial de localStorage
  const [usuario, setUsuario] = useState(null);
  
  // Usuarios y CRUD (Gestión Admin)
  const [users, setUsers] = useState([]); 
  const [cargandoUsuarios, setCargandoUsuarios] = useState(false);
  
  // --- FUNCIÓN CRUD DE CARGA DE USUARIOS (Para el useEffect) ---
  const obtenerTodosLosUsuarios = async (currentToken) => {
    if (!currentToken) return;
    setCargandoUsuarios(true);
    try {
        const response = await fetch("/api/admin/usuarios", {
            headers: { 'Authorization': `Bearer ${currentToken}` }
        });
        if (response.ok) {
            const data = await response.json();
            setUsers(data);
        } else {
            console.error("Error al listar usuarios:", response.status);
        }
    } catch (e) {
        console.error("Error de conexión al listar usuarios:", e);
    } finally {
        setCargandoUsuarios(false);
    }
  };


  // --- EFECTO CLAVE para LEER localStorage al iniciar ---
  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");
    const roleGuardado = localStorage.getItem("role");
    
    if (tokenGuardado && roleGuardado) {
        // 1. Si hay token, actualizamos el estado de inmediato
        setToken(tokenGuardado);
        setRole(roleGuardado);
        setAutenticado(true);
        // NOTA: Asumimos el email del usuario del token para la interfaz
        setUsuario({ email: 'usuario@persistente.com', rol: roleGuardado }); 
    }
    
    // 2. Una vez que terminamos de leer el navegador, indicamos que terminó la inicialización
    setInicializando(false); 
  }, []); 
  
  // 3. Efecto para cargar la lista de usuarios si somos admin (Depende de que el token esté cargado)
  useEffect(() => {
    if (autenticado && role === 'ADMIN' && token) {
        // Llama a la función de carga de usuarios
        obtenerTodosLosUsuarios(token);
    } else {
        setUsers([]); 
    }
  }, [autenticado, role, token]); 

  // --- Funciones de Auth (Login, Logout, CRUD Usuarios) ---

  const login = async (email, password) => {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) return false;

        const data = await response.json(); 
        
        // Guardar en estado
        setToken(data.token);
        setRole(data.role);
        setAutenticado(true);
        setUsuario({ email, rol: data.role });

        // Persistencia
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        
        return true;
      } catch (error) {
        console.error("Error en login:", error);
        return false;
      }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setAutenticado(false);
    setUsuario(null);
    setUsers([]); // Limpiar lista de usuarios
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  // --- Funciones CRUD Usuarios (Ahora deben usar la lógica de fetch real que definimos antes) ---
  
  const eliminarUsuario = async (id) => {
    if (!token) return false;
    try {
        const response = await fetch(`/api/admin/usuarios${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.status === 204) { 
            // Actualización optimista de la lista
            setUsers(users.filter(u => u.id !== id)); 
            return true;
        }
    } catch (e) { console.error(e); }
    return false;
  };

  const editarUsuario = async (usuarioActualizado) => {
    if (!token) return false;
    try {
        const response = await fetch(`"/api/admin/usuarios/"${usuarioActualizado.id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(usuarioActualizado)
        });
        if (response.ok) {
            const data = await response.json();
            setUsers(users.map(u => u.id === data.id ? data : u)); 
            return true;
        }
    } catch (e) { console.error(e); }
    return false;
  };


  return (
    <ContextoAuth.Provider value={{ 
      usuario, 
      users, 
      token, 
      role, 
      autenticado,
      inicializando, // EXPORTAMOS EL ESTADO INICIALIZANDO
      login, 
      logout, 
      eliminarUsuario, 
      editarUsuario,  
      cargandoUsuarios
    }}>
      {children}
    </ContextoAuth.Provider>
  );
};

export const useAuth = () => useContext(ContextoAuth);