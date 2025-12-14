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
          imagenEspecificacion: "/src/imagenes/especificacion_productos/especificacion_audifonos.jpeg",
          especificaciones: ["Conexión inalámbrica de 2.4 GHz", "Micrófono con cancelación de ruido", "Batería de hasta 20 horas"]
        },
        {
          id: 101,
          nombre: "Audífonos de Estudio Profesional",
          descripcion: "Calidad de sonido excepcional para producción musical y audiófilos.",
          precio: 89990,
          categoria: "audifonos",
          imagen: "/src/imagenes/audifonos/audifonos_image.png",
          imagenEspecificacion: "/src/imagenes/especificacion_productos/especificacion_audifonos.jpeg",
          especificaciones: ["Respuesta de frecuencia plana", "Diseño circumaural cerrado", "Cable desmontable"]
        },
        {
          id: 102,
          nombre: "Audífonos Bluetooth Deportivos",
          descripcion: "Ligeros y resistentes al sudor, perfectos para tus entrenamientos.",
          precio: 49990,
          categoria: "audifonos",
          imagen: "/src/imagenes/audifonos/audifonos_image.png",
          imagenEspecificacion: "/src/imagenes/especificacion_productos/especificacion_audifonos.jpeg",
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
          imagenEspecificacion: "/src/imagenes/especificacion_productos/especificacion_audifonos.jpeg",
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
      const mockOfertasLive = [
        {
          id: 300,
          nombre: "iPhone 17 Pro Max",
          descripcion: "Apple Intelligence integrado. Pantalla Super Retina XDR con ProMotion, Chip A19 y un revolucionario sistema de cámaras Fusion de 48 MP.",
          precio: 1499990,
          categoria: "celulares",
          imagen: "/src/imagenes/productos_normales/iphone_17_imagen.jpg",
          especificaciones: [
            "Pantalla Super Retina XDR de 6,3 pulgadas con ProMotion y Dynamic Island",
            "Clasificación IP68 de resistencia al agua y al polvo",
            "Apple Intelligence integrado para una experiencia más personal",
            "Chip A19 con CPU de 6 núcleos y GPU de 5 núcleos",
            "Sistema de dos cámaras Fusion de 48 MP (principal y ultra gran angular)",
            "Zoom óptico de 4x y zoom digital de hasta 10x",
            "Grabación de video 4K Dolby Vision y modo Cine",
            "Cámara frontal Center Stage de 18 MP con autoenfoque",
            "Batería para hasta 30 horas de reproducción de video",
            "Carga rápida: 50% en 20 minutos con adaptador de 40W",
            "Conectividad 5G, Wi-Fi 7 y Bluetooth 6",
            "Botón de Acción y control de Cámara dedicados",
            "Entrada USB-C con soporte para DisplayPort",
            "Face ID para autenticación segura",
            "iOS 26 con funcionalidades avanzadas de privacidad y accesibilidad"
          ]
        },
        {
          id: 301,
          nombre: "Refrigerador No-Frost 300L",
          descripcion: "Conserva tus alimentos frescos por más tiempo con la tecnología No-Frost.",
          precio: 349990,
          categoria: "electrodomesticos",
          imagen: "/src/imagenes/productos_normales/refrigerador_imagen.jpg",
          especificaciones: ["Capacidad de 300 litros", "Eficiencia energética A+", "Sistema No-Frost"]
        }
      ];
      
      const mockGraficas = [
        {
          id: 400,
          nombre: "AMD Radeon RX 7800 XT",
          descripcion: "Potencia y rendimiento para los juegos más exigentes.",
          precio: 549990,
          categoria: "Graficas",
          imagen: "/src/imagenes/graficas/AMD_imagen.jpg",
          especificaciones: [
            "Arquitectura: RDNA 3",
            "Memoria: 16GB GDDR6",
            "Frecuencia de reloj: Hasta 2.43 GHz",
            "Consumo: 263W"
          ]
        },
        {
          id: 401,
          nombre: "Intel Arc A770",
          descripcion: "La nueva generación de gráficos de Intel para gaming y creación de contenido.",
          precio: 499990,
          categoria: "Graficas",
          imagen: "/src/imagenes/graficas/intel_imagen.jpg",
          especificaciones: [
            "Arquitectura: Xe HPG",
            "Memoria: 16GB GDDR6",
            "Frecuencia de reloj: 2.1 GHz",
            "Consumo: 225W"
          ],
          imagenEspecificacion: "/src/imagenes/especificacion_productos/especificacion_grafica.jpeg"
        }
      ];

      // Combinar todos los productos
      let todosLosProductos = [...data, ...mockAudifonos, ...mockSamsung, ...mockOfertasLive, ...mockGraficas];

      // Aplicar descuento a todos los productos Samsung en un solo lugar
      todosLosProductos = todosLosProductos.map(p => {
        if (p.nombre.toLowerCase().includes('samsung')) {
          return { ...p, precioConDescuento: p.precio * 0.6 };
        }
        return p;
      });

      setProductos(todosLosProductos);
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