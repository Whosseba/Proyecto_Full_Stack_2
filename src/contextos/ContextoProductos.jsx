import { createContext, useState, useContext } from "react";
import laptopImg from "../imagenes/laptops/laptop.jpg";
import mouseImg from "../imagenes/accesorios/mouse.jpg";
import tecladoImg from "../imagenes/accesorios/teclado.jpg";
import monitorImg from "../imagenes/accesorios/monitor.jpg";
import gabineteImg from "../imagenes/accesorios/gabinete.jpg";
import mouseG203Img from "../imagenes/accesorios/mouseG203.jpg";
import mouseHXImg from "../imagenes/accesorios/mouseHX.jpg";
import mouseG305Img from "../imagenes/accesorios/mouseG305.jpg";
import mouseRDragonImg from "../imagenes/accesorios/mouseRDragon.jpg";
import mouseRazerImg from "../imagenes/accesorios/mouseRazer.jpg";



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
      nombre: "Mouse Gamer alambrico Logitech G203",
      precio: 20,
      descripcion: "Mouse alambrico",
      categoria: "mouses",
      imagen: mouseG203Img,
      especificaciones: [
        "Gamer",
        "Sensibilidad ajustable entre 200-8000 DPI",
        "diseño clásico de seis botones",
        "Alambrico Cable USB",
        "vida util 2 años"
      ]
    },
    {
      id: 7,
      nombre: "Mouse Gamer Hyperx Pulsefire",
      precio: 20,
      descripcion: "Mouse alambrico",
      categoria: "mouses",
      imagen: mouseHXImg,
      especificaciones: [
        "Gamer",
        "Sensibilidad ajustable 6200 DPI",
        "diseño de siete botones",
        "Alambrico Cable USB",
        "RGB"
      ]
    },
    {
      id: 8,
      nombre: "Mouse Gamer Inalambrico Logitech G305",
      precio: 20,
      descripcion: "Mouse inalambrico",
      categoria: "mouses",
      imagen: mouseG305Img,
      especificaciones: [
        "Gamer",
        "Sensibilidad ajustable 12000 DPI",
        "diseño de seis botones",
        "Inalambrico con alcance de hasta 3m",
        "RGB"
      ]
    },
    {
      id: 9,
      nombre: "Mouse Gamer Redragon Cobra M711 RGB Negro",
      precio: 20,
      descripcion: "Mouse alambrico",
      categoria: "mouses",
      imagen: mouseRDragonImg,
      especificaciones: [
        "Gamer",
        "mouse alambrico",
        "Sensibilidad ajustable de 100-10.000 DPI",
        "Peso de 0.105 kg",
        "RGB CHROMA"
      ]
    },
    {
      id: 10,
      nombre: "Mouse Gamer Razer DeathAdder V2 X HyperSpeed",
      precio: 20,
      descripcion: "Mouse inalambrico",
      categoria: "mouses",
      imagen: mouseRazerImg,
      especificaciones: [
        "Gamer",
        "mouse inalambrico",
        "Sensibilidad ajustable de hasta 14.000 DPI",
        "diseño de 7 botones programables",
        "Bluetooth"
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
