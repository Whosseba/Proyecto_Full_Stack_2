import { createContext, useState, useContext } from "react";
import laptopImg from "../imagenes/laptops/laptop.jpg";
import mouseImg from "../imagenes/accesorios/mouse.jpg";
import tecladoImg from "../imagenes/accesorios/teclado.jpg";
import monitorImg from "../imagenes/accesorios/monitor.jpg";
import gabineteImg from "../imagenes/accesorios/gabinete.jpg";
import mouse2Img from "../imagenes/accesorios/mouse2.jpg";
import teclado2Img from "../imagenes/accesorios/teclado2.jpg";
import laptop2Img from "../imagenes/laptops/laptop2.jpg";
import laptop3Img from "../imagenes/laptops/laptop3.jpg";

export const ContextoProductos = createContext();

// Nombres de las categorias: mouses, laptops, teclados, monitores, gabinetes

export const ProveedorProductos = ({ children }) => {
  const [productos, setProductos] = useState([
    { 
      id: 1,
      nombre: "Laptop Gamer",
      precio: 1500,
      descripcion: "Laptop de alto rendimiento",
      categoria: "laptops",
      imagen: laptopImg,
      especificaciones: [
        "Procesador Intel i7",
        "16GB RAM",
        "512GB SSD",
        "GPU NVIDIA RTX 3060",
        "Pantalla 15.6 pulgadas Full HD"
      ]
    },
    { 
      id: 2,
      nombre: "Mouse RGB",
      precio: 50,
      precioOferta: 25,   
      enOferta: true,
      descripcion: "Mouse ergonómico con RGB",
      categoria: "mouses",
      imagen: mouseImg,
      especificaciones: [
        "Sensor óptico 16000 DPI",
        "RGB personalizable",
        "Ergonómico",
        "6 botones programables"
      ]
    },
    { 
      id: 3,
      nombre: "Teclado Mecánico",
      precio: 12000,
      precioOferta: 9990,   
      enOferta: true,
      descripcion: "Teclado mecánico retroiluminado",
      categoria: "teclados",
      imagen: tecladoImg,
      especificaciones: [
        "Switches mecánicos Cherry MX",
        "RGB personalizable",
        "Con cable USB-C",
        "Anti-ghosting"
      ]
    },
    { 
      id: 4,
      nombre: "Monitor 27\" 4K",
      precio: 400,
      precioOferta: 350,   
      enOferta: true,
      descripcion: "Monitor Ultra HD",
      categoria: "monitores",
      imagen: monitorImg,
      especificaciones: [
        "Resolución 3840x2160",
        "144Hz",
        "Tiempo de respuesta 1ms",
        "HDR10"
      ]
    },
    { 
      id: 5,
      nombre: "Gabinete Gamer",
      precio: 200,
      precioOferta: 150,   
      enOferta: true,
      descripcion: "Gabinete con ventilación RGB",
      categoria: "gabinetes",
      imagen: gabineteImg,
      especificaciones: [
        "Panel lateral de vidrio templado",
        "Espacio para 6 ventiladores",
        "Soporta placas ATX, mATX y ITX",
        "RGB controlable"
      ]
    },
    { 
      id: 6,
      nombre: "Mouse Hp M10",
      precio: 45,
      descripcion: "Mouse Alámbrico Hp M10 Negro Bk",
      categoria: "mouses",
      imagen: mouse2Img,
      especificaciones: [
        "Resolución del sensor de 1200 dpi para un seguimiento preciso y fluido.",
        "Conexión USB para fácil uso inmediato.",
        "Orientación ambidiestra para comodidad en cualquier mano.",
        "Tres botones para un control eficiente.",
        "Velocidad máxima de 1200 ips para una respuesta rápida."
      ]
    },
    { 
      id: 7,
      nombre: "Teclado Gamer Kb892l ",
      precio: 19390,
      descripcion: "Teclado Gamer Mecánico Luces Rgb Kb892l Havit",
      categoria: "teclados",
      imagen: teclado2Img,
      especificaciones: [
        "Tipo de switch: Mecánico.",
        "Idioma: Inglés US.",
        "Layout: QWERTY.",
        "Color de la retroiluminación: RGB.",
        "Color del teclado: Negro.",
        "Función antighosting incorporada.",
        "Tipo de teclado: mecánico."
      ]
    },
    { 
      id: 8,
      nombre: "Notebook Lenovo Ideapad Slim 3",
      precio: 539990,
      descripcion: "Notebook Lenovo Ideapad Slim 3 Gen 10 Core I5 13420h 8g+512g",
      categoria: "laptops",
      imagen: laptop2Img,
      especificaciones: [
        "Procesador: Intel Core i5 13420H.",
        "Versión del sistema operativo: 11.",
        "Edición del sistema operativo: Home.",
        "Nombre del sistema operativo: Windows.",
        "Capacidad del disco rígido: 0 MB.",
        "Capacidad de disco SSD: 512 GB.",
        "Con pantalla táctil: No.",
        "Resolución de la pantalla: 1920 px x 1200 px.",
        "Conexión wifi y bluetooth.",
        "Con teclado retroiluminado."
      ]
    },
    { 
      id: 9,
      nombre: "Notebook Nitro V Acer Gamer",
      precio: 771351,
      descripcion: "Notebook Nitro V Acer Gamer Intel Core I5 16 Gb 512 Ssd rtx 3050 Color Negro ANV15-51-53TQ-1",
      categoria: "laptops",
      imagen: laptop3Img,
      especificaciones: [
        "Procesador: Intel Core i5 13420H.",
        "Versión del sistema operativo: 11.",
        "Edición del sistema operativo: Home.",
        "Nombre del sistema operativo: Windows.",
        "Capacidad de disco SSD: 512 GB.",
        "Capacidad total del módulo de memoria RAM: 16 GB.",
        "Con pantalla táctil: No.",
        "Resolución de la pantalla: 1920 px x 1080 px.",
        "Con teclado retroiluminado.",
        "Resolución de 1920x1080 px.",
        "Tarjeta gráfica RTX 3050."
      ]
    }
          
  ]);

  const agregarProducto = (nuevo) => {
    const id = productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    setProductos([...productos, { id, ...nuevo }]);
  };

  const editarProducto = (actualizado) => {
    setProductos(productos.map(p => (p.id === actualizado.id ? actualizado : p)));
  };

  const eliminarProducto = (id) => setProductos(productos.filter(p => p.id !== id));

  return (
    <ContextoProductos.Provider value={{ productos, agregarProducto, editarProducto, eliminarProducto }}>
      {children}
    </ContextoProductos.Provider>
  );
};

export const useProductos = () => useContext(ContextoProductos);
