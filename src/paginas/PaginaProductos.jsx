import { useParams, Link } from "react-router-dom";
import { useProductos } from "../contextos/ContextoProductos";
import TarjetaProducto from "../componentes/TarjetaProducto"; 

const PaginaProductos = () => {
  const { categoria } = useParams(); 
  const { productos } = useProductos();

  //FILTRADO DE OFERTAS
  const productosEnOferta = productos.filter(p => p.enOferta);
  
  //FILTRADO POR CATEGORÍA
  const productosFiltrados = categoria
    ? productos.filter(p => p.categoria === categoria)
    : productos; //Si no hay categoría, muestra todos los productos.

  return (
    <div className="container mt-5">
      {!categoria ? (
        <>
          <h1 className="text-center mb-4"> Bienvenido a TechStore</h1>
          <p className="text-center lead mb-5">
            ¡Descubre nuestras ofertas imperdibles y la mejor tecnología!
          </p>

          {/* === SECCIÓN DE OFERTAS === */}
          {productosEnOferta.length > 0 && (
            <section className="seccion-productos mb-5">
              <h2 className="text-center titulo-ofertas mb-4">¡Productos en oferta!</h2>
              <div className="row">
                {productosEnOferta.map(producto => (
                  <div key={producto.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <TarjetaProducto producto={producto} />
                  </div>
                ))}
              </div>
            </section>
          )}

          <hr className="my-5 border-primary" />

          {/* === SECCIÓN DE TODOS LOS PRODUCTOS === */}
          <section className="seccion-productos mb-5">
            <h3 className="text-center mb-4">Todos Nuestros Productos</h3>
            <div className="row">
              {productos.map(producto => (
                <div key={producto.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <TarjetaProducto producto={producto} />
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /*PÁGINAS DE CATEGORÍA*/
        <>
          <h2 className="text-center mb-4 text-capitalize">{categoria}</h2>
          <div className="seccion-productos row">
            {productosFiltrados.map(producto => (
              <div key={producto.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <TarjetaProducto producto={producto} />
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
