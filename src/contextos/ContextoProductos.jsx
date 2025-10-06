import { createContext, useState, useContext } from "react";
import laptopImg from "../imagenes/laptops/laptop.jpg";
import mouseImg from "../imagenes/accesorios/mouse.jpg";

export const ContextoProductos = createContext();

export const ProveedorProductos = ({ children }) => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Laptop Gamer", precio: 1500, descripcion: "Laptop de alto rendimiento", categoria: "laptops", imagen: laptopImg },
    { id: 2, nombre: "Mouse RGB", precio: 50, descripcion: "Mouse ergonómico con RGB", categoria: "mouses", imagen: mouseImg },
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
