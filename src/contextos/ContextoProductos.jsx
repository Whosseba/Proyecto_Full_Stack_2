import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./ContextoAuth"; 

export const ContextoProductos = createContext();

export const ProveedorProductos = ({ children }) => {
  const [productos, setProductos] = useState([]); 
  const [cargando, setCargando] = useState(true); 
  const [error, setError] = useState(null);       
  
  const { token } = useAuth(); 

  // Cargar productos del Backend al iniciar
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8080/api/productos");
      if (!res.ok) throw new Error("No se pudo conectar con el servidor");
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
      setError("Error al cargar los productos. Revisa que el Backend esté encendido.");
    } finally {
      setCargando(false); // Terminó de cargar (sea éxito o error)
    }
  };

  // Agregar (Requiere Token)
  const agregarProducto = async (nuevoProducto) => {
    try {
      const res = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(nuevoProducto)
      });
      if (res.ok) {
        const guardado = await res.json();
        setProductos([...productos, guardado]);
      }
    } catch (error) { console.error(error); }
  };

  // Editar (Requiere Token)
  const editarProducto = async (prod) => {
    try {
      const res = await fetch(`http://localhost:8080/api/productos/${prod.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(prod)
      });
      if (res.ok) {
        const actualizado = await res.json();
        setProductos(productos.map(p => p.id === actualizado.id ? actualizado : p));
      }
    } catch (error) { console.error(error); }
  };

  // Eliminar (Requiere Token)
  const eliminarProducto = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/productos/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setProductos(productos.filter(p => p.id !== id));
      }
    } catch (error) { console.error(error); }
  };

  return (
    <ContextoProductos.Provider value={{ 
      productos, 
      cargando, 
      error,    
      agregarProducto, 
      editarProducto, 
      eliminarProducto 
    }}>
      {children}
    </ContextoProductos.Provider>
  );
};

export const useProductos = () => useContext(ContextoProductos);