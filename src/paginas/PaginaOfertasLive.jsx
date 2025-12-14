import { useProductos } from '../contextos/ContextoProductos';
import TarjetaProducto from '../componentes/TarjetaProducto';
import './PaginaProductos.css';

const PaginaOfertasLive = () => {
  const { productos, cargando, error } = useProductos();

  // IDs de los productos específicos para esta oferta
  const idsOferta = [300, 301]; 

  const productosEnOferta = productos.filter(p => idsOferta.includes(p.id));

  return (
    <div className="pagina-productos">
      {/* Banner de la categoría */}
      <div className="banner-categoria text-white text-center py-5 mb-5" style={{ background: 'linear-gradient(90deg, #4e54c8, #8f94fb)' }}>
        <h1 className="display-4 fw-bold">Live Sale Days</h1>
        <p className="lead">¡Los descuentos continúan! Aprovecha estas ofertas increíbles.</p>
      </div>
      
      <div className="container">
        {cargando && (
          <div className="text-center"><div className="spinner-border text-primary"></div><p>Cargando ofertas...</p></div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row g-4">
          {!cargando && !error && productosEnOferta.length > 0 ? (
            productosEnOferta.map(producto => (
              <div key={producto.id} className="col-lg-4 col-md-6">
                <TarjetaProducto producto={producto} />
              </div>
            ))
          ) : (
            !cargando && <p className="text-center text-muted">Las ofertas especiales no están disponibles en este momento.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginaOfertasLive;