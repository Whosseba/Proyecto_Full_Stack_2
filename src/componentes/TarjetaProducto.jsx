// src/componentes/TarjetaProducto.jsx

import { useState } from "react";
import { useCarrito } from "../contextos/ContextoCarrito";
import { Link } from "react-router-dom";

// Esto debe apuntar a tu servidor Spring Boot
const BACKEND_URL = 'http://localhost:8080'; 

const TarjetaProducto = ({ producto, enOferta = false }) => {
  const { agregarAlCarrito } = useCarrito();
  const [animar, setAnimar] = useState(false);

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    setAnimar(true);
    setTimeout(() => setAnimar(false), 600);
  };
  
  // Usa el endpoint que creamos: /api/productos/images/
  const imageUrl = `${BACKEND_URL}/api/productos/images/${producto.imagen}`;

  // Simular un precio original si está en oferta
  const precioOriginal = enOferta ? producto.precio * 1.20 : null;
  
  // --- Estilos CSS en línea (Mantenidos) ---

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
          src={imageUrl} 
          alt={producto.nombre}
          style={{ width: "100%", height: "180px", objectFit: "cover" }}
          // Recomendación: Manejar el error si la imagen no se carga
          onError={(e) => { e.target.style.display = 'none'; }} 
        />
      )}
      <div style={{ padding: "15px", textAlign: "center" }}>
        <h5>{producto.nombre}</h5>
        <p style={{ minHeight: "40px", color: "#7fdfff" }}>
          {producto.descripcion}
        </p>
        <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
          {enOferta && precioOriginal && (
            <span style={{ textDecoration: 'line-through', color: '#ff4d4d', fontSize: '0.9rem' }}>
              ${precioOriginal.toLocaleString('es-CL', { maximumFractionDigits: 0 })}
            </span>
          )}
          <p className="m-0" style={{ fontWeight: "bold", fontSize: '1.2rem', color: enOferta ? "#4dff88" : "#00f0ff" }}>
            ${producto.precio.toLocaleString()}
          </p>
        </div>




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