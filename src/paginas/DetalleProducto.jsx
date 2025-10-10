import { useParams } from "react-router-dom";
import { useProductos } from "../contextos/ContextoProductos";

const DetalleProducto = () => {
  const { id } = useParams();
  const { productos } = useProductos();

  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) return <p className="text-center mt-5">Producto no encontrado</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{producto.nombre}</h2>
      <div className="row">
        <div className="col-md-6">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h4 className="fw-bold mb-3">Precio: ${producto.precio}</h4>
          <p className="mb-3">{producto.descripcion}</p>
          <h5>Especificaciones:</h5>
          <ul>
            {producto.especificaciones.map((esp, index) => (
              <li key={index}>{esp}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
