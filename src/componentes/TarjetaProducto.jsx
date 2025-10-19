import { Link } from "react-router-dom";

const TarjetaProducto = ({ producto }) => {
  const { 
    id, 
    nombre, 
    descripcion, 
    precio, 
    precioOferta, 
    enOferta, 
    imagen 
  } = producto;
  
  //cálculo del porcentaje
  let porcentajeDescuento = null;
  if (enOferta && precioOferta < precio) {
    const descuento = precio - precioOferta;
    porcentajeDescuento = Math.round((descuento / precio) * 100);
  }

  return (
    <div className="card h-100 shadow-sm">
      
      <img
        src={imagen}
        alt={nombre}
        className="card-img-top"
        style={{ objectFit: "cover", height: "200px" }} 
      />
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{nombre}</h5>
        
        {/* precio OFERTA y. NORMAL */}
        <p className="card-text mt-auto">
          {enOferta ? (
            // ESTADO DE OFERTA
            <>
              <span className="precio-original">${precio}</span>
              <strong className="precio-oferta">${precioOferta}</strong>
              
              {porcentajeDescuento !== null && (
                <span className="badge-oferta">
                  {porcentajeDescuento}% OFF
                </span>
              )}
            </>
          ) : (
            // ESTADO NORMAL
            <strong className="precio">${precio}</strong>
          )}
        </p>
        
        <Link 
            to={`/producto/${id}`} 
            className="text-light btn bg-dark btn-outline-primary mt-3" 
        >
            Ver más
        </Link>
        <button className="button mt-3">añadir al carrito</button>{/*agregar onclick */}
      </div>
    </div>
  );
};

export default TarjetaProducto;
