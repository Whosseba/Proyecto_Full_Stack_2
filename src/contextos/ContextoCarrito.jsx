import { createContext, useContext, useState } from "react";

const CarritoContexto = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existente = prevCarrito.find((item) => item.id === producto.id);
      if (existente) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarProducto = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const total = carrito.reduce(
    (acc, item) =>
      acc + (item.enOferta ? item.precioOferta : item.precio) * item.cantidad,
    0
  );

  return (
    <CarritoContexto.Provider
      value={{
        carrito,
        agregarAlCarrito,
        quitarDelCarrito,
        eliminarProducto,
        vaciarCarrito,
        total,
      }}
    >
      {children}
    </CarritoContexto.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContexto);
