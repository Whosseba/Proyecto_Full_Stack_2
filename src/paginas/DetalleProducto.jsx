import { useParams, Link } from "react-router-dom";
import { useProductos } from "../contextos/ContextoProductos";
import { useCarrito } from "../contextos/ContextoCarrito";
import { useState } from "react";
import './DetalleProducto.css';
import especificacionMouses from '../imagenes/especificacion_productos/especificacion_mouses.jpg';
import especificacionTeclado from '../imagenes/especificacion_productos/especificacion_teclado.png';
import especificacionLaptops from '../imagenes/especificacion_productos/especificacion_laptops.png';

// HACK: Hardcoded specifications for graphics cards
const hardcodedSpecs = {
  'AMD Radeon RX 7800 XT': [
    "Arquitectura: RDNA 3",
    "Memoria: 16GB GDDR6",
    "Frecuencia Boost: Hasta 2.5 GHz",
    "Ray Tracing: Sí, 2da Gen",
    "Consumo: 300W",
  ],
  'Intel Arc A770': [
    "Arquitectura: Xe-HPG",
    "Memoria: 16GB GDDR6",
    "Frecuencia Boost: Hasta 2.1 GHz",
    "Ray Tracing: Sí",
    "Consumo: 225W",
  ]
};

const hardcodedPrices = {
  'AMD Radeon RX 7800 XT': 549990,
  'Intel Arc A770': 319990,
};

const DetalleProducto = () => {
  const { id } = useParams();
  const { productos } = useProductos();
  const { agregarAlCarrito } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  if (productos.length === 0) {
    return (
      <div className="text-center mt-5 pt-5">
        <div className="spinner-border text-light" role="status"></div>
        <p className="text-light">Cargando detalles del producto...</p>
      </div>
    );
  }

  const productoOriginal = productos.find(p => p.id === parseInt(id));

  if (!productoOriginal) {
    return (
      <div className="text-center mt-5 text-light">
        <h3>Producto no encontrado</h3>
        <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
      </div>
    );
  }
  
  // HACK: Check if the product is a graphics card and merge data
  const isGrafica = Object.keys(hardcodedSpecs).includes(productoOriginal.nombre);
  const producto = {
    ...productoOriginal,
    especificaciones: isGrafica ? hardcodedSpecs[productoOriginal.nombre] : productoOriginal.especificaciones,
    precio: isGrafica ? hardcodedPrices[productoOriginal.nombre] : productoOriginal.precio,
  };


  const handleAgregar = () => {
    agregarAlCarrito(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  };

  // Determinar qué imagen de especificación mostrar
  const obtenerImagenEspecificacion = () => {
    if (producto.imagenEspecificacion) return { src: producto.imagenEspecificacion, alt: `Especificaciones de ${producto.nombre}` };
    if (producto.categoria === 'mouses') return { src: especificacionMouses, alt: "Especificaciones de Mouses" };
    if (producto.categoria === 'teclados') return { src: especificacionTeclado, alt: "Especificaciones de Teclados" };
    if (producto.categoria === 'laptop' || producto.categoria === 'laptops') return { src: especificacionLaptops, alt: "Especificaciones de Laptops" };
    return null;
  };

  const especificacionImagen = obtenerImagenEspecificacion();
  const tieneEspecificacionImagen = especificacionImagen !== null;

  return (
    <div className="detalle-container">
      <div className="detalle-header">
        <h2>{producto.nombre}</h2>
      </div>
      <div className="detalle-main">
        <div className="detalle-imagen-container">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="detalle-imagen"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
        <div className="detalle-info">
          <p className="detalle-descripcion">{producto.descripcion}</p>
          
          {producto.especificaciones && (
            <div className="detalle-specs">
              <h5>Especificaciones</h5>
              <ul>
                {Array.isArray(producto.especificaciones) ? (
                  producto.especificaciones.map((esp, index) => <li key={index}>{esp}</li>)
                ) : (
                  <li>{producto.especificaciones}</li>
                )}
              </ul>
            </div>
          )}

          <div className="detalle-acciones">
            <h3 className="detalle-precio">${producto.precio.toLocaleString('es-CL')}</h3>
            <button
              onClick={handleAgregar}
              className={`btn-agregar-detalle ${agregado ? "btn-agregado" : ""}`}
              disabled={agregado}
            >
              {agregado ? "¡Agregado al Carrito!" : "Agregar al Carrito"}
            </button>
          </div>
        </div>
      </div>

      {/* Muestra la imagen de especificación si existe en el producto */}
      {tieneEspecificacionImagen && (
        <div className="especificaciones-adicionales-container mt-5">
          <h3 className="text-center mb-4">Especificaciones Detalladas</h3>
          <div className="text-center">
            <img src={especificacionImagen.src} alt={especificacionImagen.alt} className="especificaciones-adicionales-imagen" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleProducto;