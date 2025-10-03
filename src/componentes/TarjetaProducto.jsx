import { Link } from "react-router-dom";

const TarjetaProducto = ({ producto }) => (
  <div className="card m-2" style={{ width: "18rem" }}>
    <div className="card-body">
      <h5 className="card-title">{producto.nombre}</h5>
      <p className="card-text">{producto.descripcion}</p>
      <p className="card-text"><strong>${producto.precio}</strong></p>
      <Link to={`/producto/${producto.id}`} className="btn btn-primary">Ver detalle</Link>
    </div>
  </div>
);

export default TarjetaProducto;
