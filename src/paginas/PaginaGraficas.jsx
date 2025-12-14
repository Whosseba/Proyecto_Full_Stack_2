import { useProductos } from '../contextos/ContextoProductos';
import { useCarrito } from '../contextos/ContextoCarrito';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PaginaGraficas.css';

const PaginaGraficas = () => {
  const { productos, cargando, error } = useProductos();
  const { agregarAlCarrito } = useCarrito();

  // Filtramos las dos tarjetas gráficas que queremos mostrar
  const productoAMD = productos.find(p => p.nombre.includes('AMD Radeon RX 7800 XT'));
  const productoIntel = productos.find(p => p.nombre.includes('Intel Arc A770'));

  if (cargando) {
    return <div className="text-center mt-5 pt-5 text-white"><div className="spinner-border text-info"></div><p>Cargando tarjetas...</p></div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  const renderCard = (producto, theme) => {
    if (!producto) return null;

    return (
      <motion.div 
        className={`grafica-card ${theme}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="grafica-titulo">{producto.nombre}</h2>
        <Link to={`/producto/${producto.id}`}>
          <img src={producto.imagen} alt={producto.nombre} className="grafica-imagen" />
        </Link>
        <div className="grafica-body">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" data-bs-toggle="tab" data-bs-target={`#specs-${producto.id}`} type="button" role="tab">Especificaciones</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target={`#buy-${producto.id}`} type="button" role="tab">Precio y Compra</button>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane fade show active" id={`specs-${producto.id}`} role="tabpanel">
              <ul className="list-group list-group-flush">
                {producto.especificaciones.map((spec, index) => (
                  <li key={index} className="list-group-item">{spec}</li>
                ))}
              </ul>
            </div>
            <div className="tab-pane fade" id={`buy-${producto.id}`} role="tabpanel">
              <div className="buy-panel">
                <p className="precio-grafica">${producto.precio.toLocaleString('es-CL')}</p>
                <div className="d-flex justify-content-around w-100">
                  <button className="btn btn-success" onClick={() => agregarAlCarrito(producto)}>Comprar</button>
                  <Link to={`/producto/${producto.id}`} className="btn btn-info">Ver más</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="pagina-graficas"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="banner-categoria text-white text-center py-5 mb-5">
        <motion.h1
          className="display-4 fw-bold"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Tarjetas Gráficas
        </motion.h1>
        <motion.p
          className="lead"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Elige tu bando: Potencia y rendimiento para tus juegos y proyectos.
        </motion.p>
      </div>

      <div className="container">
        <div className="graficas-comparison-container">
          {renderCard(productoAMD, 'theme-amd')}
          <div className="vs-divider">VS</div>
          {renderCard(productoIntel, 'theme-intel')}
        </div>
      </div>
    </motion.div>
  );
};

export default PaginaGraficas;