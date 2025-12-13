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
      const mockSamsung = [
        {
          id: 200,
          nombre: "Auriculares Samsung Galaxy Buds Pro",
          descripcion: "Sonido inmersivo y cancelación de ruido inteligente para una experiencia auditiva superior.",
          precio: 189990,
          precio_descuento: 149990,
          categoria: "audifonos",
          imagen: "/src/imagenes/productos_samsungs/audifonos_samsung.jpg",
          especificaciones: ["Cancelación Activa de Ruido Inteligente", "Sonido de estudio con altavoces de 2 vías", "Resistencia al agua IPX7", "Hasta 8 horas de reproducción"],
          oferta: true
        },
        {
          id: 201,
          nombre: "Televisor Samsung 55\" Crystal UHD 4K",
          descripcion: "Colores vibrantes y detalles nítidos con la tecnología Crystal UHD de Samsung.",
          precio: 499990,
          precio_descuento: 399990,
          categoria: "televisores",
          imagen: "/src/imagenes/productos_samsungs/televisor_samsung.png",
          especificaciones: ["Procesador Crystal 4K", "Diseño sin bordes", "Compatible con HDR10+", "Smart TV con Tizen"],
          oferta: true
        }
      ];
      setProductos([...data, ...mockAudifonos, ...mockSamsung]);
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