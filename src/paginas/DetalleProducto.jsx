import { useParams, Link } from "react-router-dom";
import { useProductos } from "../contextos/ContextoProductos";
import { useCarrito } from "../contextos/ContextoCarrito";
import { useState, useMemo } from "react";
import { FaCheckCircle, FaShoppingCart, FaExclamationTriangle } from 'react-icons/fa';

// Imágenes de especificaciones
// import especificacionesGabinetes from '../imagenes/especificaciones/especificaciones_gabinetes.jpg';
import especificacionesGabinetes from '../imagenes/especificaciones/especificaciones_gabinetes.jpg';
import especificacionesLaptops from '../imagenes/especificaciones/especificaciones_laptops.jpeg';
import especificacionesMonitores from '../imagenes/especificaciones/especificaciones_monitores.jpeg';
import especificacionesMouses from '../imagenes/especificaciones/especificaciones_mouses.jpeg';
import especificacionesTeclados from '../imagenes/especificaciones/especificaciones_teclados.jpg';

const BACKEND_URL = 'http://localhost:8080';

const imagenesEspecificaciones = {
    // gabinetes: especificacionesGabinetes,
    gabinetes: especificacionesGabinetes,
    laptops: especificacionesLaptops,
    monitores: especificacionesMonitores,
    mouses: especificacionesMouses,
    teclados: especificacionesTeclados,
};

const DetalleProducto = () => {
    const { id } = useParams();
    const { productos } = useProductos();
    const { agregarAlCarrito } = useCarrito();
    const [agregado, setAgregado] = useState(false);

    const producto = useMemo(() => {
        if (productos.length === 0) return null;
        return productos.find(p => p.id === parseInt(id));
    }, [id, productos]);

    if (productos.length === 0) {
        return (
            <div className="text-center mt-5 pt-5 text-white">
                <div className="spinner-border text-info" role="status"></div>
                <p>Cargando detalles del producto...</p>
            </div>
        );
    }

    if (!producto) {
        return (
            <div className="text-center mt-5 text-white">
                <h3>Producto no encontrado</h3>
                <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
            </div>
        );
    }

    const productosRelacionados = productos.filter(
        p => p.categoria === producto.categoria && p.id !== producto.id
    ).slice(0, 4);

    const imageUrl = producto.imagen
        ? `${BACKEND_URL}/api/productos/images/${producto.imagen}`
        : '';

    const imagenEspecificacion = imagenesEspecificaciones[producto.categoria];

    const handleAgregar = () => {
        agregarAlCarrito(producto);
        setAgregado(true);
        setTimeout(() => setAgregado(false), 1200);
    };

    const StockDisplay = () => {
        if (producto.stock > 10) {
            return <span className="badge bg-success p-2"><FaCheckCircle /> En Stock</span>;
        }
        if (producto.stock > 0) {
            return <span className="badge bg-warning text-dark p-2"><FaExclamationTriangle /> ¡Últimas {producto.stock} unidades!</span>;
        }
        return <span className="badge bg-danger p-2">Agotado</span>;
    };

    return (
        <div className="pagina-detalle-producto container-fluid" style={{ background: "#0a0f1f", color: "#fff", padding: "40px 20px" }}>
            <div className="container">
                <div className="row justify-content-center">
                    {/* Columna Izquierda: Imagen del Producto */}
                    <div className="col-lg-6 mb-4 text-center">
                        {producto.imagen && (
                            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "15px", padding: "20px", border: "1px solid #00eaff" }}>
                                <img
                                    src={imageUrl}
                                    alt={producto.nombre}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: "500px", objectFit: "contain" }}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Columna Derecha: Detalles y Compra */}
                    <div className="col-lg-6">
                        <div style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(10px)", borderRadius: "15px", padding: "30px", border: "1px solid #00eaff33" }}>
                            <h1 className="fw-bold mb-2" style={{ color: "#00eaff", textShadow: "0 0 10px #00eaff" }}>{producto.nombre}</h1>
                            <p className="text-muted mb-3">Categoría: <Link to={`/productos/${producto.categoria}`} className="text-reset">{producto.categoria}</Link></p>

                            <p className="lead mb-4" style={{ color: "#ccc" }}>{producto.descripcion}</p>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="fw-bold m-0" style={{ color: "#4dff88", fontSize: "2.5rem" }}>
                                    ${producto.precio.toLocaleString()}
                                </h2>
                                <StockDisplay />
                            </div>

                            <button
                                onClick={handleAgregar}
                                className={`btn btn-lg w-100 fw-bold d-flex align-items-center justify-content-center gap-2 ${agregado ? 'btn-success' : 'btn-primary'}`}
                                disabled={producto.stock === 0 || agregado}
                                style={{
                                    padding: "15px",
                                    boxShadow: `0 0 20px ${agregado ? '#28a745' : '#007bff'}`,
                                    transition: "all 0.3s ease"
                                }}
                            >
                                {agregado ? <><FaCheckCircle /> ¡Agregado!</> : <><FaShoppingCart /> Agregar al Carrito</>}
                            </button>

                            {producto.especificaciones && (
                                <div className="mt-5">
                                    <h4 style={{ color: "#00eaff" }}>Especificaciones Técnicas</h4>
                                    <ul className="list-unstyled mt-3" style={{ color: "#eee" }}>
                                        {(Array.isArray(producto.especificaciones) ? producto.especificaciones : producto.especificaciones.split(',')).map((esp, index) => (
                                            <li key={index} className="d-flex align-items-start mb-2">
                                                <FaCheckCircle className="me-2 mt-1" style={{ color: "#00eaff" }} />
                                                <span>{esp.trim()}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sección de Imagen de Especificaciones */}
                {imagenEspecificacion && (
                    <div className="row mt-5 pt-5 border-top border-secondary">
                        <div className="col-12 text-center">
                             <h2 className="text-center mb-4" style={{ color: "#00eaff" }}>Detalles del Fabricante</h2>
                            <img
                                src={imagenEspecificacion}
                                alt={`Especificaciones para ${producto.categoria}`}
                                className="img-fluid rounded"
                                style={{ maxWidth: '900px', border: "1px solid #00eaff33" }}
                            />
                        </div>
                    </div>
                )}

                {/* Sección de Productos Relacionados */}
                {productosRelacionados.length > 0 && (
                    <div className="mt-5 pt-5 border-top border-secondary">
                        <h2 className="text-center mb-4" style={{ color: "#00eaff" }}>También te podría interesar</h2>
                        <div className="row">
                            {productosRelacionados.map(relacionado => (
                                <div key={relacionado.id} className="col-lg-3 col-md-6 mb-4">
                                    <div className="card h-100 text-white" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #00eaff33", transition: "transform 0.2s" }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <Link to={`/producto/${relacionado.id}`}>
                                            <img
                                                src={`${BACKEND_URL}/api/productos/images/${relacionado.imagen}`}
                                                className="card-img-top"
                                                alt={relacionado.nombre}
                                                style={{ height: "200px", objectFit: "cover" }}
                                            />
                                        </Link>
                                        <div className="card-body text-center d-flex flex-column">
                                            <h5 className="card-title" style={{ color: "#00eaff" }}>{relacionado.nombre}</h5>
                                            <p className="card-text mt-auto fw-bold fs-5" style={{ color: "#4dff88" }}>${relacionado.precio.toLocaleString()}</p>
                                            <Link to={`/producto/${relacionado.id}`} className="btn btn-outline-info mt-2">
                                                Ver Detalles
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetalleProducto;