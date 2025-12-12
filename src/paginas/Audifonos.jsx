import React from "react";
import { useProductos } from "../contextos/ContextoProductos";
import Categoria from "../componentes/Categoria";

const Audifonos = () => {
  const { productos } = useProductos();
  const audifonos = productos.filter(p => p.categoria === "audifonos");

  return (
    <div>
      <h2>Audífonos Disponibles</h2>
      <Categoria productos={audifonos} />
    </div>
  );
};

export default Audifonos;
