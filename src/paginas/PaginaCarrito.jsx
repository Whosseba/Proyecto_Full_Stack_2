import { useCarrito } from "../contextos/ContextoCarrito";
import { Link, useNavigate } from "react-router-dom";

const PaginaCarrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito, total } = useCarrito();
  const navigate = useNavigate();

  const irAlCheckout = () => {
    navigate("/checkout");
  };

  if (carrito.length === 0) {
    return (
      <div className="container mt-4">
        <h2>🛒 Carrito de Compras</h2>
        <p>Tu carrito está vacío.</p>
        <Link to="/" className="btn btn-primary">Volver a productos</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>🛒 Carrito de Compras</h2>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map(item => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>${item.precio.toLocaleString()}</td>
              <td>{item.cantidad}</td>
              <td>${(item.precio * item.cantidad).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Total: ${total.toLocaleString()}</h4>

      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-warning" onClick={vaciarCarrito}>
          Vaciar carrito
        </button>
        <button className="btn btn-success" onClick={irAlCheckout}>
          Ir a Checkout
        </button>
      </div>
    </div>
  );
};

export default PaginaCarrito;
