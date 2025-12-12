import { useParams, Link } from "react-router-dom";
import { useProductos } from "../contextos/ContextoProductos";
import { useCarrito } from "../contextos/ContextoCarrito";
import { useState } from "react";
import './DetalleProducto.css'; // Importar el nuevo CSS

const DetalleProducto = () => {
  const { id } = useParams();
  const { productos } = useProductos();
  const { agregarAlCarrito } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  // Pantalla de carga
  if (productos.length === 0) {
    return (
      <div className="text-center mt-5 pt-5">
        <div className="spinner-border text-light" role="status"></div>
        <p className="text-light">Cargando detalles del producto...</p>
      </div>
    );
  }

  const producto = productos.find(p => p.id === parseInt(id));

  // Producto no encontrado
  if (!producto) {
    return (
      <div className="text-center mt-5 text-light">
        <h3>Producto no encontrado</h3>
        <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
      </div>
    );
  }

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  };

  return (
    <div className="detalle-container">
      <div className="detalle-header">
        <h2>{producto.nombre}</h2>
      </div>
      <div className="detalle-main">
        <div className="detalle-imagen-container">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="detalle-imagen"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
        <div className="detalle-info">
          <p className="detalle-descripcion">{producto.descripcion}</p>
          
          {producto.especificaciones && (
            <div className="detalle-specs">
              <h5>Especificaciones</h5>
              <ul>
                {Array.isArray(producto.especificaciones) ? (
                  producto.especificaciones.map((esp, index) => <li key={index}>{esp}</li>)
                ) : (
                  <li>{producto.especificaciones}</li>
                )}
              </ul>
            </div>
          )}

          <div className="detalle-acciones">
            <h3 className="detalle-precio">${producto.precio.toLocaleString()}</h3>
            <button
              onClick={handleAgregar}
              className={`btn-agregar-detalle ${agregado ? "btn-agregado" : ""}`}
              disabled={agregado}
            >
              {agregado ? "¡Agregado al Carrito!" : "Agregar al Carrito"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;