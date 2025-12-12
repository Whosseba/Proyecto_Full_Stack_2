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
      const mockAudifonos = [
        {
          id: 100,
          nombre: "Audífonos Gamer Inalámbricos",
          descripcion: "Sumérgete en el juego con estos audífonos inalámbricos de alta fidelidad.",
          precio: 129990,
          categoria: "audifonos",
          imagen: "/src/imagenes/audifonos/audifonos_image.png",
          especificaciones: ["Conexión inalámbrica de 2.4 GHz", "Micrófono con cancelación de ruido", "Batería de hasta 20 horas"]
        },
        {
          id: 101,
          nombre: "Audífonos de Estudio Profesional",
          descripcion: "Calidad de sonido excepcional para producción musical y audiófilos.",
          precio: 89990,
          categoria: "audifonos",
          imagen: "/src/imagenes/audifonos/audifonos_image.png",
          especificaciones: ["Respuesta de frecuencia plana", "Diseño circumaural cerrado", "Cable desmontable"]
        },
        {
          id: 102,
          nombre: "Audífonos Bluetooth Deportivos",
          descripcion: "Ligeros y resistentes al sudor, perfectos para tus entrenamientos.",
          precio: 49990,
          categoria: "audifonos",
          imagen: "/src/imagenes/audifonos/audifonos_image.png",
          especificaciones: ["Certificación IPX7", "Ganchos de oreja ajustables", "Estuche de carga incluido"]
        }
      ];
      setProductos([...data, ...mockAudifonos]);
    } catch (error) {
      console.error("Error cargando productos:", error);
      setError("Error al cargar los productos. Revisa que el Backend esté encendido.");
    } finally {
      setCargando(false); 
    }
  };

  
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