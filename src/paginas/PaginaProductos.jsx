import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../contextos/ContextoProductos";
import TarjetaProducto from "../componentes/TarjetaProducto";
import { motion, AnimatePresence } from "framer-motion";

import descuentosBanner from "../imagenes/descuentos_imagenes/descuentos.jpg";
import descuentosBanner2 from "../imagenes/descuentos_imagenes/descuentos_2.jpg";

const PaginaProductos = () => {
  const { categoria } = useParams();
  const { productos, cargando, error } = useProductos();
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");

  const productosEnOferta = productos ? productos.slice(0, 3) : [];

  const productosFiltrados = (categoria
    ? productos.filter(p => p.categoria?.toLowerCase() === categoria.toLowerCase())
    : productos
  ).filter(p => p.nombre?.toLowerCase().includes(busqueda.toLowerCase()));

  const animacionProducto = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.06, y: -6, boxShadow: "0px 12px 25px rgba(0,0,0,0.25)" }
  };

  const handleBusqueda = (e) => {
    e.preventDefault();
    const productoEncontrado = productos.find(
      p => p.nombre?.toLowerCase() === busqueda.toLowerCase()
    );
    if (productoEncontrado) {
      navigate(`/producto/${productoEncontrado.id}`);
    } else {
      alert("No se encontró ningún producto con ese nombre");
    }
  };

  const scrollToDestacados = (e) => {
    e.preventDefault();
    const seccion = document.getElementById('productos-destacados');
    if (seccion) {
      seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <div className="container mt-4">

      {/* 🔥 CARRUSEL MODERNO */}
      <div id="carouselBanners" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner">

          {[descuentosBanner, descuentosBanner2].map((img, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
              <div 
                className="position-relative text-center"
                // Hacemos que ambas imágenes sean clickeables
                onClick={scrollToDestacados}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={img}
                  className="d-block mx-auto"
                  alt={`Banner ${i + 1}`}
                  style={{
                    width: "100%",
                    maxHeight: "420px",
                    objectFit: "cover",
                    borderRadius: "14px",
                    filter: "brightness(0.85)",
                    boxShadow: "0px 10px 25px rgba(0,0,0,0.35)"
                  }}
                />

                {/* Overlay con texto */}
                <div
                  className="position-absolute top-50 start-50 translate-middle text-white"
                  style={{ textShadow: "0px 4px 10px rgba(0,0,0,0.8)" }}
                >
                  <h2 className="fw-bold display-5">Ofertas Exclusivas</h2>
                  <p className="lead">Tecnología al mejor precio</p>
                </div>
              </div>
            </div>
          ))}

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselBanners" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselBanners" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* 🔍 BUSCADOR ESTILO HERO */}
      <form onSubmit={handleBusqueda} className="d-flex justify-content-center mb-5">
        <input
          type="text"
          className="form-control w-50 me-2 shadow-sm"
          style={{ padding: "12px 18px", borderRadius: "10px" }}
          placeholder="Buscar productos tecnológicos..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <button type="submit" className="btn btn-primary px-4">Buscar</button>
      </form>

      {/* ESTADOS */}
      {cargando && (
        <div className="text-center py-5">
          <div className="spinner-border text-info"></div>
          <p className="mt-2 text-muted">Cargando productos...</p>
        </div>
      )}

      {error && !cargando && (
        <div className="alert alert-danger text-center">
          {error} <br />
          <small>Servidor no disponible</small>
        </div>
      )}

      {!cargando && !error && productos.length === 0 && (
        <div className="alert alert-warning text-center">
          No hay productos disponibles.
        </div>
      )}

      {/* CONTENIDO */}
      {!cargando && !error && productos.length > 0 && (
        !categoria ? (
          <>
            <motion.h1
              className="text-center mb-3 fw-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                background: "linear-gradient(90deg, #007bff, #00d4ff)",
                WebkitBackgroundClip: "text",
                color: "transparent"
              }}
            >
              Bienvenido a TechStore
            </motion.h1>

            <motion.p
              className="text-center lead mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Innovación, calidad y precios increíbles.
            </motion.p>

            {/* DESTACADOS */}
            {productosEnOferta.length > 0 && (
              <section id="productos-destacados" className="mb-5 pt-4">
                <h2 className="text-center mb-4 fw-semibold">🔥 Productos Destacados</h2>
                <div className="row">
                  <AnimatePresence>
                    {productosEnOferta
                      .filter(p => p.nombre?.toLowerCase().includes(busqueda.toLowerCase()))
                      .map((producto, index) => (
                        <motion.div
                          key={producto.id}
                          className="col-lg-3 col-md-4 col-sm-6 mb-4"
                          variants={animacionProducto}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                          <TarjetaProducto producto={producto} enOferta={true} />
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              </section>
            )}

            <hr className="my-5" />

            {/* TODOS LOS PRODUCTOS */}
            <section className="mb-5">
              <h3 className="text-center mb-4 fw-semibold">Todos los Productos</h3>
              <div className="row">
                <AnimatePresence>
                  {productosFiltrados.map((producto, index) => (
                    <motion.div
                      key={producto.id}
                      className="col-lg-3 col-md-4 col-sm-6 mb-4"
                      variants={animacionProducto}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <TarjetaProducto producto={producto} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          </>
        ) : (
          <>
            <motion.h2
              className="text-center mb-4 text-capitalize fw-bold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {categoria}
            </motion.h2>

            <div className="row">
              <AnimatePresence>
                {productosFiltrados.map((producto, index) => (
                  <motion.div
                    key={producto.id}
                    className="col-lg-3 col-md-4 col-sm-6 mb-4"
                    variants={animacionProducto}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <TarjetaProducto producto={producto} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {productosFiltrados.length === 0 && (
                <div className="alert alert-warning text-center">
                  No hay productos en esta categoría.
                </div>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default PaginaProductos;