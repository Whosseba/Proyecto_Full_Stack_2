import { useState } from "react";
import { useCarrito } from "../contextos/ContextoCarrito";
import { Link } from "react-router-dom";

const TarjetaProducto = ({ producto }) => {
  const { agregarAlCarrito } = useCarrito();
  const [animar, setAnimar] = useState(false);

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    setAnimar(true);
    setTimeout(() => setAnimar(false), 600);
  };

  const cardStyle = {
    width: "18rem",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#111",
    color: "#0ff",
    boxShadow: "0 0 15px rgba(0,255,255,0.4)",
    transition: "transform 0.3s, box-shadow 0.3s",
    transform: animar ? "scale(1.05)" : "scale(1)",
  };

  const buttonStyle = {
    background: "#00f",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s",
  };

  const buttonHover = {
    background: "#0ff",
    color: "#000",
    boxShadow: "0 0 10px #0ff",
  };

  const verMasStyle = {
    background: "transparent",
    color: "#0ff",
    border: "2px solid #0ff",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "0.3s",
    fontWeight: "bold",
  };

  const verMasHover = {
    background: "#0ff",
    color: "#000",
  };

  return (
    <div style={cardStyle} className="m-2 shadow-sm">
      {producto.imagen && (
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{ width: "100%", height: "180px", objectFit: "cover" }}
        />
      )}
      <div style={{ padding: "15px", textAlign: "center" }}>
        <h5>{producto.nombre}</h5>
        <p style={{ minHeight: "40px", color: "#7fdfff" }}>
          {producto.descripcion}
        </p>
        <p style={{ fontWeight: "bold", color: "#00f0ff" }}>
          ${producto.precio.toLocaleString()}
        </p>

        <div className="d-flex justify-content-center gap-2">
          <button
            onClick={handleAgregar}
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
          >
            🛒 Agregar
          </button>

          <Link
            to={`/producto/${producto.id}`}
            style={verMasStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, verMasHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, verMasStyle)}
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TarjetaProducto;
