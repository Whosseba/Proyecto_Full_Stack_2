import { useCarrito } from "../contextos/ContextoCarrito";

const PaginaCarrito = () => {
  const { carrito, quitarDelCarrito, eliminarProducto, vaciarCarrito, total } = useCarrito();

  if (carrito.length === 0) {
    return <div className="container mt-5"><h3>Tu carrito está vacío 🛒</h3></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Carrito de compras</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>${item.enOferta ? item.precioOferta : item.precio}</td>
              <td>{item.cantidad}</td>
              <td>
                ${(item.enOferta ? item.precioOferta : item.precio) * item.cantidad}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger me-2"
                  onClick={() => quitarDelCarrito(item.id)}
                >
                  -
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => eliminarProducto(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-3">Total: ${total}</h4>
      <button className="btn btn-danger mt-3" onClick={vaciarCarrito}>
        Vaciar carrito
      </button>
    </div>
  );
};

export default PaginaCarrito;
