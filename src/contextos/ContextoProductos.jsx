import { createContext, useState, useContext } from "react";
import laptopImg from "../imagenes/laptops/laptop.jpg";
import mouseImg from "../imagenes/accesorios/mouse.jpg";
import tecladoImg from "../imagenes/accesorios/teclado.jpg";
import monitorImg from "../imagenes/accesorios/monitor.jpg";
import gabineteImg from "../imagenes/accesorios/gabinete.jpg";
import mouse2Img from "../imagenes/accesorios/mouse2.jpg";

export const ContextoProductos = createContext();

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
      precio: 120,
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
      categoria: "mouse",
      imagen: mouse2Img,
      especificaciones: [
        "Resolución del sensor de 1200 dpi para un seguimiento preciso y fluido.",
        "Conexión USB para fácil uso inmediato.",
        "Orientación ambidiestra para comodidad en cualquier mano.",
        "Tres botones para un control eficiente.",
        "Velocidad máxima de 1200 ips para una respuesta rápida."
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
