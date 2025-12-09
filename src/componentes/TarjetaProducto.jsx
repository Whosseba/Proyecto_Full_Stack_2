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
    agregarAlCarrito(producto);
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
        <p className="tarjeta-producto-precio">
          ${producto.precio.toLocaleString('es-CL')}
        </p>

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

