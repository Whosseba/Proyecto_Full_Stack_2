import { useState } from "react";
import { useCarrito } from "../contextos/ContextoCarrito";
import { useNavigate } from "react-router-dom";

const PaginaCheckout = () => {
  const { carrito, total, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();

  // formulario
  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [cvv, setCvv] = useState("");
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);
  const [procesando, setProcesando] = useState(false);

  const DESCUENTO = 0.2; 
  const CODIGO_VALIDO = "TECHSTORE";

  // Función para aplicar código de descuento
  const aplicarDescuento = () => {
    if (codigoDescuento.toUpperCase() === CODIGO_VALIDO) {
      setDescuentoAplicado(true);
      alert("¡Código válido! Se aplicó 20% de descuento.");
    } else {
      alert("Código inválido.");
    }
  };

  // Helpers para permitir solo números
  const soloDigitos = (str) => str.replace(/\D/g, "");

  const handleNumeroTarjetaChange = (e) => {
    setNumeroTarjeta(soloDigitos(e.target.value).slice(0, 16));
  };

  const handleCvvChange = (e) => {
    setCvv(soloDigitos(e.target.value).slice(0, 4));
  };

  const permitirSoloNumeros = (e) => {
    const teclasPermitidas = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"];
    if (!teclasPermitidas.includes(e.key) && !/^[0-9]$/.test(e.key)) e.preventDefault();
  };

  // Simular pago
  const simularPago = (e) => {
    e.preventDefault();
    if (!nombreTarjeta || numeroTarjeta.length < 13 || numeroTarjeta.length > 16 || cvv.length < 3) {
      alert("Completa correctamente todos los campos.");
      return;
    }
    setProcesando(true);
    setTimeout(() => {
      setProcesando(false);
      vaciarCarrito();
      alert(`¡Pago realizado!${descuentoAplicado ? " Se aplicó 20% de descuento." : ""}`);
      navigate("/confirmacion"); // Página de confirmación
    }, 2000);
  };

  if (carrito.length === 0) return <p>El carrito está vacío. Añade productos antes de pagar.</p>;

  const totalFinal = descuentoAplicado ? total * (1 - DESCUENTO) : total;

  return (
    <div className="container mt-4">
      <h2>💳 Checkout</h2>
      <p>Total a pagar: <strong>${totalFinal.toLocaleString()}</strong></p>

      {!descuentoAplicado && (
        <div className="mb-3">
          <input
            type="text"
            placeholder="Ingresa código de descuento"
            className="form-control mb-2"
            value={codigoDescuento}
            onChange={(e) => setCodigoDescuento(e.target.value)}
          />
          <button type="button" className="btn btn-info btn-sm" onClick={aplicarDescuento}>
            Aplicar código
          </button>
        </div>
      )}

      <form onSubmit={simularPago}>
        <input
          type="text"
          placeholder="Nombre en la tarjeta"
          className="form-control mb-2"
          value={nombreTarjeta}
          onChange={(e) => setNombreTarjeta(e.target.value)}
        />
        <input
          type="text"
          placeholder="Número de tarjeta"
          className="form-control mb-2"
          value={numeroTarjeta}
          onChange={handleNumeroTarjetaChange}
          onKeyDown={permitirSoloNumeros}
        />
        <input
          type="text"
          placeholder="CVV"
          className="form-control mb-2"
          value={cvv}
          onChange={handleCvvChange}
          onKeyDown={permitirSoloNumeros}
        />
        <button className="btn btn-success" type="submit" disabled={procesando}>
          {procesando ? "Procesando..." : "Pagar"}
        </button>
      </form>
    </div>
  );
};

export default PaginaCheckout;
