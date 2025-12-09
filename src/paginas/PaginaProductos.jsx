import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductos } from "../contextos/ContextoProductos";
import TarjetaProducto from "../componentes/TarjetaProducto";
import { motion, AnimatePresence } from "framer-motion";
import './PaginaProductos.css'; // Importamos el CSS

const PaginaProductos = () => {
  const { categoria } = useParams();
  const { productos, cargando, error } = useProductos();
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = (categoria
    ? productos.filter(p => p.categoria?.toLowerCase() === categoria.toLowerCase())
    : productos
  ).filter(p => p.nombre?.toLowerCase().includes(busqueda.toLowerCase()));

  const animacionContenedor = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const animacionProducto = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const nombreCategoria = categoria ? categoria.replace(/-/g, ' ') : 'Todos los productos';

  if (cargando) {
    return (
      <div className="estado-pagina-centrado">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="estado-pagina-centrado">
        <div className="alert alert-danger text-center" role="alert">
            <h4>Ocurrió un Error</h4>
            <p>{error}</p>
            <small>Es posible que el servidor no esté disponible.</small>
        </div>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="estado-pagina-centrado">
        <div className="alert alert-warning text-center">
            <h4>¡Tienda Vacía!</h4>
            <p>Aún no se han agregado productos. Vuelve más tarde.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="pagina-productos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Banner Superior */}
      <div className="banner-categoria text-white text-center py-5 mb-5">
        <motion.h1 
          className="text-capitalize display-4 fw-bold"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {nombreCategoria}
        </motion.h1>
        <motion.p 
          className="lead"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Explora nuestro catálogo y encuentra lo que buscas.
        </motion.p>
      </div>

      {/* Barra de Búsqueda */}
      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Buscar por nombre..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Listado de Productos */}
      <div className="container">
        {productosFiltrados.length > 0 ? (
          <motion.div 
            className="row g-4"
            variants={animacionContenedor}
            initial="hidden"
            animate="visible"
          >
            {productosFiltrados.map((producto) => (
              <motion.div
                key={producto.id}
                className="col-lg-4 col-md-6"
                variants={animacionProducto}
              >
                <TarjetaProducto producto={producto} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-5">
            <h4 className="text-muted">No se encontraron productos</h4>
            <p>Intenta con otra búsqueda o revisa las categorías.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PaginaProductos;