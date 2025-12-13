import { useParams, Link } from "react-router-dom";
import { useProductos } from "../contextos/ContextoProductos";
import TarjetaProducto from "../componentes/TarjetaProducto";
import { motion } from "framer-motion";
import './PaginaProductos.css'; // Importamos el CSS
import imagenSamsung from '../imagenes/logos_empresa/imagen_de_descuentos_samsung.jpg';
import imagenDescuentos from '../imagenes/logos_empresa/descuentos_celular_tv.jpg';

const PaginaProductos = () => {
  const { categoria } = useParams();
  const { productos, cargando, error } = useProductos();
  const categoriaFormateada = categoria ? categoria.replace(/-/g, ' ') : null;

  const productosFiltrados = categoria
    ? categoria === 'samsung-con-descuento'
      ? productos.filter(p => p.nombre.toLowerCase().includes('samsung'))
      : productos.filter(p => p.categoria?.toLowerCase() === categoriaFormateada.toLowerCase())
    : productos;

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

  const nombreCategoria = categoria
    ? categoria === 'samsung-con-descuento'
      ? 'Productos Samsung con Descuento'
      : categoria.replace(/-/g, ' ')
    : 'Todos los productos';

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
      {/* Carrusel de Imágenes */}
      {!categoria && (
        <div className="container">
          <div id="carouselExampleControls" className="carousel slide mb-5" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <Link to="/productos/samsung-con-descuento">
                  <img src={imagenSamsung} className="d-block w-100" alt="Descuentos Samsung" />
                </Link>
              </div>
              <div className="carousel-item">
                <img src={imagenDescuentos} className="d-block w-100" alt="Descuentos General" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>
      )}

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