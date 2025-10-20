import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../contextos/ContextoProductos";
import TarjetaProducto from "../componentes/TarjetaProducto";
import { motion, AnimatePresence } from "framer-motion";

const PaginaProductos = () => {
  const { categoria } = useParams();
  const { productos } = useProductos();
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");

  const productosEnOferta = productos.filter(p => p.enOferta);
  const productosFiltrados = (categoria
    ? productos.filter(p => p.categoria === categoria)
    : productos
  ).filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  const animacionProducto = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }
  };

  const handleBusqueda = (e) => {
    e.preventDefault();
    const productoEncontrado = productos.find(
      p => p.nombre.toLowerCase() === busqueda.toLowerCase()
    );
    if (productoEncontrado) {
      navigate(`/producto/${productoEncontrado.id}`);
    } else {
      alert("No se encontró ningún producto con ese nombre");
    }
  };

  return (
    <div className="container mt-5">

      <form onSubmit={handleBusqueda} className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>

      {!categoria ? (
        <>
          <motion.h1
            className="text-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Bienvenido a TechStore
          </motion.h1>

          <motion.p
            className="text-center lead mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            ¡Descubre nuestras ofertas imperdibles y la mejor tecnología!
          </motion.p>

          {productosEnOferta.length > 0 && (
            <section className="seccion-productos mb-5">
              <h2 className="text-center titulo-ofertas mb-4">¡Productos en oferta!</h2>
              <div className="row">
                <AnimatePresence>
                  {productosEnOferta
                    .filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
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
                        <TarjetaProducto producto={producto} />
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </section>
          )}

          <hr className="my-5 border-primary" />

          <section className="seccion-productos mb-5">
            <h3 className="text-center mb-4">Todos Nuestros Productos</h3>
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
            className="text-center mb-4 text-capitalize"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categoria}
          </motion.h2>

          <div className="seccion-productos row">
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
              <p className="text-center">No hay productos que coincidan con tu búsqueda.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PaginaProductos;
