import { useState } from "react";
import { useCarrito } from "../contextos/ContextoCarrito";
import { Link } from "react-router-dom";
import './TarjetaProducto.css'; // Importar el archivo CSS

const TarjetaProducto = ({ producto }) => {
  const { agregarAlCarrito } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  // Fallback para productos sin imagen
  const imagenProducto = producto.imagen || 'https://via.placeholder.com/400x300.png?text=Sin+Imagen';

  const handleAgregar = () => {
    // Si hay descuento, se usa ese precio para el carrito.
    // Si no, se usa el precio normal.
    const productoParaAgregar = {
      ...producto,
    };

    agregarAlCarrito(productoParaAgregar);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 800); // Resetear animación
  };

  return (
    <div className="tarjeta-producto">
      <Link to={`/producto/${producto.id}`} className="tarjeta-producto-imagen-contenedor">
        <img
          src={imagenProducto}
          alt={producto.nombre}
          className="tarjeta-producto-imagen"
        />
      </Link>
      <div className="tarjeta-producto-cuerpo">
        <h5 className="tarjeta-producto-nombre">{producto.nombre}</h5>
        <p className="tarjeta-producto-descripcion">
          {producto.descripcion}
        </p>
        
        <div className="tarjeta-producto-precio-contenedor">
          {producto.precioConDescuento ? (
            <>
              <span 
                className="precio-original" 
                style={{ textDecoration: 'line-through', color: '#a9a9a9', marginRight: '10px' }}
              >
                ${producto.precio.toLocaleString('es-CL')}
              </span>
              <span 
                className="precio-descuento"
                style={{ color: '#28a745', fontWeight: 'bold', fontSize: '1.2rem' }}
              >${producto.precioConDescuento.toLocaleString('es-CL')}</span>
            </>
          ) : (
            <span className="precio-normal">${producto.precio.toLocaleString('es-CL')}</span>
          )}
        </div>

        <div className="tarjeta-producto-botones">
          <button
            onClick={handleAgregar}
            className={`btn btn-primary btn-agregar ${agregado ? 'animar' : ''}`}
          >
            🛒 Agregar
          </button>

          <Link
            to={`/producto/${producto.id}`}
            className="btn btn-secondary btn-ver-mas"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TarjetaProducto;