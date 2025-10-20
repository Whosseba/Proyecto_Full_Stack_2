import { useParams } from "react-router-dom";
import { useProductos } from "../contextos/ContextoProductos";

const DetalleProducto = () => {
  const { id } = useParams();
  const { productos } = useProductos();

  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) return <p className="text-center mt-5">Producto no encontrado</p>;

  return (
    <div className="pagina-detalle-producto container mt-5">  
      <h2 className="mb-4">{producto.nombre}</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="borde-rgb-gamer p-3">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded "
          />
          </div>
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold mb-3">Precio: ${producto.precio}</h3>
          <p className="mb-3">{producto.descripcion}</p>
          <h5>Especificaciones:</h5>
          <ul>
            {producto.especificaciones.map((esp, index) => (
              <li key={index}>{esp}</li>
            ))}
          </ul>
          <button className="button">Agregar al carrito</button>{/*agregar onclick*/}
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
