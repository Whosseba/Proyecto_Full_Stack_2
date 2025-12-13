import { useProductos } from '../contextos/ContextoProductos';
import TarjetaProducto from '../componentes/TarjetaProducto';
import './PaginaProductos.css';

const PaginaSamsung = () => {
  const { productos, cargando, error } = useProductos();

  const productosEnOferta = productos.filter(p => p.oferta === true);

  return (
    <div className="pagina-productos">
      <h1>Ofertas Especiales de Samsung</h1>
      <p>¡Aprovecha estos descuentos exclusivos en productos Samsung seleccionados!</p>
      
      {cargando && <p>Cargando ofertas...</p>}
      {error && <p>{error}</p>}

      <div className="productos-grid">
        {!cargando && !error && productosEnOferta.length > 0 ? (
          productosEnOferta.map(producto => (
            <TarjetaProducto key={producto.id} producto={producto} />
          ))
        ) : (
          !cargando && <p>No hay ofertas especiales disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default PaginaSamsung;
