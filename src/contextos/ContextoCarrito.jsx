import { createContext, useState, useContext, useEffect } from "react";

const ContextoCarrito = createContext();

export const ProveedorCarrito = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  const [codigo, setCodigo] = useState("");

  // Guarda el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // 🎫 Generar código de compra aleatorio (mantiene tu lógica)
  const generarCodigo = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let nuevoCodigo = "";
    for (let i = 0; i < 4; i++) {
      nuevoCodigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCodigo(nuevoCodigo);
  };

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
    setCodigo("");
    localStorage.removeItem("carrito");
  };

  // Calcular total
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  // Calcular cantidad total de productos
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <ContextoCarrito.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        total,
        codigo,
        generarCodigo,
        cantidadTotal,
      }}
    >
      {children}
    </ContextoCarrito.Provider>
  );
};

export const useCarrito = () => useContext(ContextoCarrito);