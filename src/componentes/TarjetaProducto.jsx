import { Link } from "react-router-dom";
import { useCarrito } from "../contextos/ContextoCarrito";

const TarjetaProducto = ({ producto }) => {
  const { agregarAlCarrito } = useCarrito();

  return (
    <div className="card m-2 shadow-sm" style={{ width: "18rem" }}>
      {producto.imagen && (
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
          style={{ height: "180px", objectFit: "cover" }}
        />
      )}
      <div className="card-body text-center">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text text-muted" style={{ minHeight: "40px" }}>
          {producto.descripcion}
        </p>
        <p className="card-text">
          <strong>${producto.precio.toLocaleString()}</strong>
        </p>

        <div className="d-flex justify-content-center gap-2">
          <Link to={`/producto/${producto.id}`} className="btn btn-primary btn-sm">
            Ver detalle
          </Link>
          <button
            onClick={() => agregarAlCarrito(producto)}
            className="btn btn-success btn-sm"
          >
            🛒 Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaProducto;