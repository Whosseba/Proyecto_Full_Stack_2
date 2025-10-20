import { useParams } from "react-router-dom";
import { useProductos } from "../contextos/ContextoProductos";
import { useCarrito } from "../contextos/ContextoCarrito";
import { useState } from "react";

const DetalleProducto = () => {
  const { id } = useParams();
  const { productos } = useProductos();
  const { agregarAlCarrito } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto)
    return <p className="text-center mt-5">Producto no encontrado</p>;

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1200);
  };

  return (
    <div
      className="pagina-detalle-producto container mt-5"
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
          textShadow: "0 0 5px #00e5ff, 0 0 10px #0ff",
        }}
      >
        {producto.nombre}
      </h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div
            className="borde-rgb-gamer p-3"
            style={{
              borderRadius: "12px",
              boxShadow: "0 0 15px rgba(0,255,255,0.4)",
              background: "#111",
            }}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold mb-3">Precio: ${producto.precio.toLocaleString()}</h3>
          <p className="mb-3">{producto.descripcion}</p>
          {producto.especificaciones && (
            <>
              <h5>Especificaciones:</h5>
              <ul>
                {producto.especificaciones.map((esp, index) => (
                  <li key={index}>{esp}</li>
                ))}
              </ul>
            </>
          )}
          <button
            onClick={handleAgregar}
            style={{
              background: agregado ? "#0f0" : "#00f",
              color: agregado ? "#000" : "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
              marginTop: "15px",
            }}
          >
            {agregado ? "¡Agregado!" : "🛒 Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
