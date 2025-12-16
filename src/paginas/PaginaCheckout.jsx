import React, { useState } from 'react';
import { useCarrito } from '../contextos/ContextoCarrito';
import { useAuth } from '../contextos/ContextoAuth';
import { useNavigate } from 'react-router-dom';

const PaginaCheckout = () => {
    const { carrito, total, vaciarCarrito, generarCodigo } = useCarrito();
    const { autenticado, token } = useAuth();
    const navigate = useNavigate();
    
    const [mensaje, setMensaje] = useState("");
       const [procesando, setProcesando] = useState(false);
    const [delivery, setDelivery] = useState(false);

    const totalConDelivery = delivery ? total * 1.1 : total;

    if (carrito.length === 0) {
        return (
            <div className="container text-center mt-5">
                <h2 className="text-danger">Carrito Vacío</h2>
                <p>No tienes productos para pagar.</p>
            </div>
        );
    }

    const handleProcesarPedido = async (e) => {
        e.preventDefault();
        setProcesando(true);
        setMensaje("");

        if (!autenticado || !token) {
            setMensaje("Error: Debes iniciar sesión para completar la compra.");
            setProcesando(false);
            return;
        }

        const itemsPedido = carrito.map(item => ({
            productoId: item.id,
            nombreProducto: item.nombre,
            cantidad: item.cantidad,
            precioUnitario: item.precio 
        }));

        const pedidoAEnviar = {
            total: totalConDelivery,
            items: itemsPedido
        };

        try {
            const response = await fetch("/api/pedidos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(pedidoAEnviar)
            });

            if (response.ok) {
                generarCodigo(); 
                vaciarCarrito();
                navigate('/confirmacion');
            } else if (response.status === 500) {
                setMensaje("Error: Stock insuficiente para uno o más productos.");
            } else {
                setMensaje(`Error al procesar el pedido. Código: ${response.status}.`);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            setMensaje("Error de conexión con el servidor. Verifica que el Backend esté encendido.");
        } finally {
            setProcesando(false);
        }
    };

    // --- ESTILOS ---
    const pageStyle = { 
        background: "linear-gradient(135deg, #0a0f1f, #0f2b3a, #123b4d)", 
        color: "#fff",
        minHeight: "100vh",
        padding: "40px 0",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    };

    const cardStyle = { 
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid #00eaff",
        borderRadius: "15px",
        boxShadow: "0 0 25px rgba(0, 255, 255, 0.3)",
        color: "#fff"
    };

    const inputStyle = { 
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        color: "#fff",
        border: "1px solid #00eaff",
    };

    const listGroupItemStyle = { 
        backgroundColor: "transparent",
        color: "#fff",
        borderBottom: "1px solid rgba(0, 255, 255, 0.3)",
    };

    return (
        <div style={pageStyle}>
            <div className="container">
                <h2 className="mb-4 text-center" style={{ textShadow: "0 0 12px #00eaff" }}>
                    Finalizar Compra
                </h2>

                {mensaje && <div className="alert alert-danger">{mensaje}</div>}

                <div className="row">

                    {/* --- Resumen del Pedido --- */}
                    <div className="col-md-7">
                        <div className="card p-4 mb-4" style={cardStyle}>
                            <h4 style={{ color: "#00eaff" }}>Resumen del Pedido</h4>

                            <ul className="list-group list-group-flush">
                                {carrito.map(item => (
                                    <li 
                                        key={item.id} 
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                        style={listGroupItemStyle}
                                    >
                                        {item.nombre} (x{item.cantidad})
                                        <span>${(item.precio * item.cantidad).toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={delivery}
                                    onChange={() => setDelivery(!delivery)}
                                    id="deliveryCheckbox"
                                />
                                <label className="form-check-label" htmlFor="deliveryCheckbox">
                                    Incluir delivery (10% adicional)
                                </label>
                            </div>

                            <h4 className="mt-3 text-end" style={{ color: "#4dff88" }}>
                                Total a Pagar: ${totalConDelivery.toLocaleString()}
                            </h4>
                        </div>
                    </div>

                    {/* --- Formulario de Pago --- */}
                    <div className="col-md-5">
                        <form onSubmit={handleProcesarPedido} className="card p-4" style={cardStyle}>
                            <h4 style={{ color: "#00eaff" }}>Datos de Pago</h4>

                            <div className="mb-3">
                                <label className="form-label text-white">Nombre en la tarjeta</label>
                                <input type="text" className="form-control" required style={inputStyle} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-white">Número de Tarjeta</label>
                                <input type="text" className="form-control" maxLength="16" required style={inputStyle} />
                            </div>

                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label className="form-label text-white">Fecha Exp.</label>
                                    <input type="text" className="form-control" placeholder="MM/AA" maxLength="5" required style={inputStyle} />
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="form-label text-white">CVV</label>
                                    <input type="text" className="form-control" maxLength="3" required style={inputStyle} />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success btn-lg mt-3 w-100"
                                disabled={procesando}
                                style={{
                                    boxShadow: "0 0 15px #28ffae, 0 0 25px #28ffae",
                                    fontWeight: "bold"
                                }}
                            >
                                {procesando ? (
                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                ) : (
                                    `Confirmar Pago ($${totalConDelivery.toLocaleString()})`
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PaginaCheckout;