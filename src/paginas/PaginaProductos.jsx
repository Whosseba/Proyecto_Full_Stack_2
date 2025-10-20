import { useParams } from "react-router-dom";
import { useProductos } from "../contextos/ContextoProductos";
import TarjetaProducto from "../componentes/TarjetaProducto"; 

const PaginaProductos = () => {
  const { categoria } = useParams(); 
  const { productos } = useProductos();

  const productosEnOferta = productos.filter(p => p.enOferta);
  const productosFiltrados = categoria
    ? productos.filter(p => p.categoria === categoria)
    : productos;

  const containerStyle = {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "linear-gradient(135deg, #0f0f0f, #1a1a1a, #000000)",
    color: "#00cfff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const tituloStyle = {
    textAlign: "center",
    fontWeight: "bold",
    color: "#00cfff",
    textShadow: "0 0 3px #00cfff, 0 0 6px #00bfff",
    marginBottom: "20px",
    fontSize: "3rem",
  };

  const subtituloStyle = {
    textAlign: "center",
    color: "#7fdfff",
    textShadow: "0 0 2px #00cfff, 0 0 4px #00bfff",
    marginBottom: "40px",
    fontSize: "1.2rem",
  };

  const seccionStyle = {
    marginBottom: "60px",
    padding: "20px",
    borderRadius: "15px",
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 0 15px rgba(0, 200, 255, 0.3)",
  };

  const rowStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  };

  const hrStyle = {
    border: "0",
    height: "1px",
    background: "linear-gradient(to right, #00cfff, transparent)",
    margin: "50px 0",
  };

  return (
    <div style={containerStyle}>
      {!categoria ? (
        <>
          <h1 style={tituloStyle}>Bienvenido a TechStore</h1>
          <p style={subtituloStyle}>
            ¡Descubre nuestras ofertas imperdibles y la mejor tecnología!
          </p>

          {productosEnOferta.length > 0 && (
            <section style={seccionStyle}>
              <h2 style={{ ...tituloStyle, fontSize: "2.2rem" }}>¡Productos en oferta!</h2>
              <div style={rowStyle}>
                {productosEnOferta.map(producto => (
                  <TarjetaProducto key={producto.id} producto={producto} mostrarPrecio={true} />
                ))}
              </div>
            </section>
          )}

          <hr style={hrStyle} />

          <section style={seccionStyle}>
            <h3 style={{ ...tituloStyle, fontSize: "2rem" }}>Todos Nuestros Productos</h3>
            <div style={rowStyle}>
              {productos.map(producto => (
                <TarjetaProducto key={producto.id} producto={producto} mostrarPrecio={true} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <h2 style={{ ...tituloStyle, textTransform: "capitalize" }}>{categoria}</h2>
          <div style={rowStyle}>
            {productosFiltrados.map(producto => (
              <TarjetaProducto key={producto.id} producto={producto} mostrarPrecio={true} />
            ))}
            {productosFiltrados.length === 0 && (
              <p style={{ color: "#00cfff", textAlign: "center", fontSize: "1.2rem" }}>
                No hay productos en esta categoría.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PaginaProductos;
