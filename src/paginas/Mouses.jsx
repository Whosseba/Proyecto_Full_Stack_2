import React from "react";
import { useProductos } from "../contextos/ContextoProductos";
import Categoria from "../componentes/Categoria";

const Mouses = () => {
  const { productos } = useProductos();
  const mouses = productos.filter(p => p.categoria === "mouses");

  return (
    <div>
      <h2>Mouses Disponibles</h2>
      <Categoria productos={mouses} />
    </div>
  );
};

export default Mouses;
