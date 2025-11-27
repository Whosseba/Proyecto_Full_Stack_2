import { useParams, Link } from "react-router-dom";
import { useProductos } from "../contextos/ContextoProductos";
import { useCarrito } from "../contextos/ContextoCarrito";
import { useState } from "react";

const DetalleProducto = () => {
  const { id } = useParams();
  const { productos } = useProductos();
  const { agregarAlCarrito } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  // Protección de Carga: Si aún no llegan los productos, mostramos cargando
  if (productos.length === 0) {
    return (
      <div className="text-center mt-5 pt-5 text-white">
        <div className="spinner-border text-info" role="status"></div>
        <p>Cargando detalles del producto...</p>
      </div>
    );
  }

  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto)
    return (
        <div className="text-center mt-5 text-white">
            <h3>Producto no encontrado</h3>
            <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
        </div>
    );

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1200);
  };

  return (
    <div
      className="pagina-detalle-producto container mt-5 Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f0f, #1a1a1a, #000000)",
        color: "#00f0ff",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        className="mb-4"
        style={{
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 2px #0e373bff, 0 0 10px rgba(15, 81, 81, 1)",
        }}
      >
        {producto.nombre}
      </h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div
            className="borde-rgb-gamer p-3"
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded"
              onError={(e) => e.target.style.display = 'none'} // Oculta si la imagen falla
            />
          </div>
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold mb-3">Precio: ${producto.precio.toLocaleString()}</h3>
          <p className="mb-3">{producto.descripcion}</p>
          
          {producto.especificaciones ? (
             Array.isArray(producto.especificaciones) ? (
                <>
                  <h5>Especificaciones:</h5>
                  <ul>
                    {producto.especificaciones.map((esp, index) => (
                      <li key={index}>{esp}</li>
                    ))}
                  </ul>
                </>
             ) : (
                <p><strong>Detalles:</strong> {producto.especificaciones}</p>
             )
          ) : (
             <p>Sin especificaciones adicionales.</p>
          )}

          <button
            onClick={handleAgregar}
          >
            {agregado ? "¡Agregado!" : "🛒 Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;