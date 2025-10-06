import React from "react";
import { useProductos } from "../contextos/ContextoProductos";
import Categoria from "../componentes/Categoria";

const Laptops = () => {
  const { productos } = useProductos();
  const laptops = productos.filter(p => p.categoria === "laptops");

  return (
    <div>
      <h2>Laptops Disponibles</h2>
      <Categoria productos={laptops} />
    </div>
  );
};

export default Laptops;
