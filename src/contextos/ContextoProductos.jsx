import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./ContextoAuth"; // Importamos Auth para usar el token al editar/borrar

export const ContextoProductos = createContext();

export const ProveedorProductos = ({ children }) => {
  const [productos, setProductos] = useState([]); // Iniciamos vacío
  const { token } = useAuth(); // Necesitamos el token para acciones protegidas

  // 1. CARGAR PRODUCTOS DEL BACKEND AL INICIAR
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/productos");
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  // 2. AGREGAR PRODUCTO (Requiere Token)
  const agregarProducto = async (nuevoProducto) => {
    try {
      const res = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // SEGURIDAD
        },
        body: JSON.stringify(nuevoProducto)
      });
      if (res.ok) {
        const productoGuardado = await res.json();
        setProductos([...productos, productoGuardado]);
        return true;
      }
    } catch (error) {
      console.error("Error agregando:", error);
    }
    return false;
  };

  // 3. EDITAR PRODUCTO (Requiere Token)
  const editarProducto = async (productoActualizado) => {
    try {
      const res = await fetch(`http://localhost:8080/api/productos/${productoActualizado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productoActualizado)
      });
      if (res.ok) {
        const actualizado = await res.json();
        setProductos(productos.map(p => (p.id === actualizado.id ? actualizado : p)));
      }
    } catch (error) {
      console.error("Error editando:", error);
    }
  };

  // 4. ELIMINAR PRODUCTO (Requiere Token)
  const eliminarProducto = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/productos/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        setProductos(productos.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  return (
    <ContextoProductos.Provider value={{ productos, agregarProducto, editarProducto, eliminarProducto }}>
      {children}
    </ContextoProductos.Provider>
  );
};

export const useProductos = () => useContext(ContextoProductos);