import { useCarrito } from "../contextos/ContextoCarrito";
import { Link, useNavigate } from "react-router-dom";

const PaginaCarrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito, total } = useCarrito();
  const navigate = useNavigate();

  const irAPagar = () => {
    navigate("/checkout");
  };

  const containerStyle = {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "linear-gradient(135deg, #0f0f0f, #1a1a1a, #000000)",
    color: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    background: "rgba(20, 30, 50, 0.8)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 0 20px rgba(0,123,255,0.5)",
  };

  const thTdStyle = {
    padding: "12px",
    textAlign: "center",
    borderBottom: "1px solid rgba(0,255,255,0.2)",
    color: "#00f0ff",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s",
  };

  const deleteButton = {
    ...buttonStyle,
    backgroundColor: "#ff4d4d",
    color: "#fff",
  };

  const deleteHover = {
    backgroundColor: "#ff1a1a",
    boxShadow: "0 0 10px #ff4d4d",
  };

  const actionButton = {
    ...buttonStyle,
    backgroundColor: "#0a74ff",
    color: "#fff",
  };

  const actionHover = {
    backgroundColor: "#00e5ff",
    color: "#000",
    boxShadow: "0 0 10px #00e5ff",
  };

  if (carrito.length === 0) {
    return (
      <div style={containerStyle}>
        <h2>🛒 Carrito de Compras</h2>
        <p>Tu carrito está vacío.</p>
        <Link to="/" style={{ ...actionButton, textDecoration: "none" }}>
          Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2>🛒 Carrito de Compras</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Producto</th>
            <th style={thTdStyle}>Precio</th>
            <th style={thTdStyle}>Cantidad</th>
            <th style={thTdStyle}>Subtotal</th>
            <th style={thTdStyle}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td style={thTdStyle}>{item.nombre}</td>
              <td style={thTdStyle}>${item.precio.toLocaleString()}</td>
              <td style={thTdStyle}>{item.cantidad}</td>
              <td style={thTdStyle}>
                ${(item.precio * item.cantidad).toLocaleString()}
              </td>
              <td style={thTdStyle}>
                <button
                  style={deleteButton}
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, deleteHover)}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, deleteButton)}
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "20px", textAlign: "right" }}>
        Total: ${total.toLocaleString()}
      </h3>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <button
          style={actionButton}
          onMouseOver={(e) => Object.assign(e.currentTarget.style, actionHover)}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButton)}
          onClick={vaciarCarrito}
        >
          Vaciar carrito
        </button>
        <button
          style={actionButton}
          onMouseOver={(e) => Object.assign(e.currentTarget.style, actionHover)}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButton)}
          onClick={irAPagar}
        >
          Ir a pagar
        </button>
      </div>
    </div>
  );
};

export default PaginaCarrito;
