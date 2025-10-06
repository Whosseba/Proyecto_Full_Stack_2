import { useState } from "react";
import { useProductos } from "../contextos/ContextoProductos";

const PaginaProductos = () => {
  const { productos } = useProductos();
  const [categoria, setCategoria] = useState("todos"); 

  const productosFiltrados =
    categoria === "todos"
      ? productos
      : productos.filter(p => p.categoria === categoria);

  return (
    <div>
      <h2>Productos</h2>

      {/* Botones de filtro */}
      <div className="mb-4">
        <button className="btn btn-primary me-2" onClick={() => setCategoria("todos")}>
          Todos
        </button>
        <button className="btn btn-success me-2" onClick={() => setCategoria("laptops")}>
          Laptops
        </button>
        <button className="btn btn-warning" onClick={() => setCategoria("mouses")}>
          Mouses
        </button>
      </div>

      {/* Lista de productos filtrados */}
      <div className="row">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="col-md-4 mb-4">
            <img src={producto.imagen} alt={producto.nombre} className="img-fluid" />
            <h4>{producto.nombre}</h4>
            <p>{producto.descripcion}</p>
            <p>${producto.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginaProductos;
