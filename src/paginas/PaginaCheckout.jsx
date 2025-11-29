import React, { useState } from 'react';
import { useCarrito } from '../contextos/ContextoCarrito';
import { useAuth } from '../contextos/ContextoAuth';
import { useNavigate } from 'react-router-dom';

const PaginaCheckout = () => {
    const { carrito, total, vaciarCarrito, generarCodigo } = useCarrito();
    // Asegúrate que useAuth y useCarrito se importan correctamente desde los hooks en los Contextos
    const { autenticado, token, usuario } = useAuth(); 
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState("");
    const [procesando, setProcesando] = useState(false);

    // Si el carrito está vacío, lo detenemos aquí.
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

        // Verificación de Autenticación (aunque RutaProtegida debería haberlo hecho)
        if (!autenticado || !token || !usuario || !usuario.email) {
            setMensaje("Error: Debes iniciar sesión para completar la compra.");
            setProcesando(false);
            return;
        }

        // 1. Mapeamos el carrito de React al formato que el Backend espera (ItemPedido)
        const itemsPedido = carrito.map(item => ({
            productoId: item.id,
            nombreProducto: item.nombre,
            cantidad: item.cantidad,
            precioUnitario: item.precio // Asegúrate de que este es el precio final
        }));

        const pedidoAEnviar = {
            total: total,
            items: itemsPedido
            // El emailUsuario se saca automáticamente del Token en el Backend
        };

        try {
            // 2. ENVIAMOS EL PEDIDO AL BACKEND
            const response = await fetch("http://localhost:8080/api/pedidos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Incluimos el TOKEN para la seguridad
                },
                body: JSON.stringify(pedidoAEnviar)
            });

            if (response.ok) {
                // 3. Éxito: Generamos código, limpiamos carrito y redirigimos
                generarCodigo(); // Genera el código para la página de confirmación
                vaciarCarrito();
                navigate('/confirmacion');
            } else if (response.status === 403) {
                setMensaje("Error de Permisos (403). Vuelve a iniciar sesión.");
            } else {
                setMensaje("Error al procesar el pedido. Código de error: " + response.status);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            setMensaje("Error de conexión con el servidor. Verifica el backend.");
        } finally {
            setProcesando(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Finalizar Compra</h2>
            
            {mensaje && <div className="alert alert-danger">{mensaje}</div>}

            <div className="row">
                <div className="col-md-7">
                    <div className="card p-4 mb-4">
                        <h4 className="text-info">Resumen del Pedido</h4>
                        <ul className="list-group list-group-flush">
                            {carrito.map(item => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {item.nombre} (x{item.cantidad})
                                    <span>${(item.precio * item.cantidad).toLocaleString()}</span>
                                </li>
                            ))}
                        </ul>
                        <h4 className="mt-3 text-end text-success">Total a Pagar: ${total.toLocaleString()}</h4>
                    </div>
                </div>

                <div className="col-md-5">
                    <form onSubmit={handleProcesarPedido} className="card p-4">
                        <h4 className="text-info">Datos de Pago</h4>
                        
                        <div className="mb-3">
                            <label className="form-label">Nombre en la tarjeta</label>
                            <input type="text" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Número de Tarjeta</label>
                            <input type="text" className="form-control" maxLength="16" required />
                        </div>
                        <div className="row">
                            <div className="col-6 mb-3">
                                <label className="form-label">Fecha Exp.</label>
                                <input type="text" className="form-control" placeholder="MM/AA" maxLength="5" required />
                            </div>
                            <div className="col-6 mb-3">
                                <label className="form-label">CVV</label>
                                <input type="text" className="form-control" maxLength="3" required />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-success btn-lg mt-3" 
                            disabled={procesando}
                        >
                            {procesando ? (
                                <span className="spinner-border spinner-border-sm" role="status"></span>
                            ) : (
                                `Confirmar Pago (${total.toLocaleString()})`
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaginaCheckout;