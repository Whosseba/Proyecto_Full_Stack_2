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
    background: "linear-gradient(135deg, #3a0ca3, #480ca8, #560bad)",
    color: "#ffffff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 0 20px rgba(189, 147, 249, 0.5)",
  };

  const thTdStyle = {
    padding: "12px",
    textAlign: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    color: "#e0cffc",
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
    backgroundColor: "#c71f37",
    color: "#ffffff",
  };

  const deleteHover = {
    backgroundColor: "#a5182c",
    boxShadow: "0 0 10px #c71f37",
  };

  const actionButton = {
    ...buttonStyle,
    backgroundColor: "#7b2cbf",
    color: "#ffffff",
  };

  const actionHover = {
    backgroundColor: "#9d4edd",
    color: "#ffffff",
    boxShadow: "0 0 10px #9d4edd",
  };

  if (carrito.length === 0) {
    return (
      <div style={containerStyle}>
        <h2>🛒 Carrito de Compras</h2>
        <p style={{ color: '#f1f1f1' }}>Tu carrito está vacío.</p>
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
