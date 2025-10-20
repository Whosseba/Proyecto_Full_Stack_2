import { Link } from "react-router-dom";
import { useCarrito } from "../contextos/ContextoCarrito";

const TarjetaProducto = ({ producto }) => {
  const { agregarAlCarrito } = useCarrito();

  const { 
    id, 
    nombre, 
    descripcion, 
    precio, 
    precioOferta, 
    enOferta, 
    imagen 
  } = producto;
  
  let porcentajeDescuento = null;
  if (enOferta && precioOferta < precio) {
    const descuento = precio - precioOferta;
    porcentajeDescuento = Math.round((descuento / precio) * 100);
  }

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={imagen}
        alt={nombre}
        className="card-img-top"
        style={{ objectFit: "cover", height: "200px" }}
      />
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text mt-auto">
          {enOferta ? (
            <>
              <span className="text-muted text-decoration-line-through">
                ${precio}
              </span>{" "}
              <strong className="text-danger">${precioOferta}</strong>{" "}
              {porcentajeDescuento !== null && (
                <span className="badge bg-success">
                  {porcentajeDescuento}% OFF
                </span>
              )}
            </>
          ) : (
            <strong>${precio}</strong>
          )}
        </p>

        <Link
          to={`/producto/${id}`}
          className="btn btn-dark mt-2"
        >
          Ver más
        </Link>

        <button
          className="btn btn-primary mt-2"
          onClick={() => agregarAlCarrito(producto)}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default TarjetaProducto;
