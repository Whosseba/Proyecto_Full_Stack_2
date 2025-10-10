import { useParams, Link } from "react-router-dom";
import { useProductos } from "../contextos/ContextoProductos";

const PaginaProductos = () => {
  const { categoria } = useParams(); 
  const { productos } = useProductos();

  const productosFiltrados = categoria
    ? productos.filter(p => p.categoria === categoria)
    : [];

  return (
    <div className="container mt-5">
      {!categoria ? (
        <>
          <h2 className="text-center mb-4">Bienvenido a TechStore</h2>
          <p className="text-center">Selecciona una categoría desde la barra de navegación para ver los productos.</p>
        </>
      ) : (
        <>
          <h2 className="text-center mb-4 text-capitalize">{categoria}</h2>
          <div className="row">
            {productosFiltrados.map(producto => (
              <div key={producto.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text fw-bold">${producto.precio}</p>
                    <Link
                      to={`/producto/${producto.id}`}
                      className="btn btn-outline-primary mt-auto"
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {productosFiltrados.length === 0 && (
              <p className="text-center">No hay productos en esta categoría.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PaginaProductos;
