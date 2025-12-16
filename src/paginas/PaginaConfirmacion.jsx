import React from 'react';
import { Link } from 'react-router-dom';

const PaginaConfirmacion = () => {
  const cardStyle = {
    background: "rgba(0, 0, 0, 0.7)",
    border: "1px solid #00eaff",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
    color: "#fff",
    padding: "30px",
    marginTop: "40px",
    textAlign: "center"
  };

  const headerStyle = {
    color: "#00eaff",
    textShadow: "0 0 10px #00eaff"
  };

  return (
    <div className="container">
      <div style={cardStyle}>
        <h2 className="mb-4" style={headerStyle}>¡Pago confirmado!</h2>
        <p>Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p>
        <p style={{ color: "#4dff88", fontWeight: "bold" }}>
          Tu pedido llegará en 4 días hábiles.
        </p>
        <div className="text-center mt-4">
          <Link to="/" className="btn btn-primary" style={{boxShadow: "0 0 10px #007bff"}}>
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaginaConfirmacion;