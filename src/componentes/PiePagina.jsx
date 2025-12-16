import bancoEstadoLogo from '../imagenes/logos_bancos/bancoestado.jpg';
import mercadoPagoLogo from '../imagenes/logos_bancos/mercadopago.jpg';

const PiePagina = () => (
  <footer 
    className="text-white text-center mt-auto pt-4 pb-3"
    style={{
      background: "linear-gradient(135deg, #0d0d0d, #1a1a1a, #0d6efd33)",
      borderTop: "2px solid #0d6efd",
      boxShadow: "0 -2px 10px rgba(0,0,0,0.4)"
    }}
  >

    {/* TÍTULO */}
    <h5 className="fw-bold mb-3" style={{ letterSpacing: "1px" }}>
      ⚡ TechStore — Tecnología que te impulsa
    </h5>

    {/* INFORMACIÓN PRINCIPAL */}
    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 mb-3">

      <span className="d-flex align-items-center gap-2">
        © 2025 TechStore
      </span>

      <span className="d-flex align-items-center gap-2">
        📍 Av. Providencia 1234, Santiago, Chile
      </span>

      <span className="d-flex align-items-center gap-2">
        ✉️ contacto@techstore.cl
      </span>

      <span className="d-flex align-items-center gap-2">
        📞 +56 9 1234 5678
      </span>

    </div>

    {/* HORARIOS */}
    <div className="mt-3">
      <h6 className="fw-bold mb-2">🕒 Horarios de Atención</h6>

      <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
        Lunes a Viernes: <span className="text-white fw-semibold">10:00 - 19:00</span>
      </p>

      <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
        Sábado: <span className="text-white fw-semibold">10:00 - 14:00</span>
      </p>

      <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
        Domingo: <span className="text-white fw-semibold">Cerrado</span>
      </p>
    </div>

    {/* SEPARADOR */}
    <hr className="mx-auto" style={{ width: "60%", borderColor: "#0d6efd" }} />

    {/* MÉTODOS DE PAGO */}
    <div className="mt-3">
      <h6 className="fw-bold mb-2">💳 Métodos de Pago</h6>

      <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">

        <img 
          src={bancoEstadoLogo} 
          alt="BancoEstado" 
          style={{ width: "110px", filter: "brightness(0.9)" }}
        />

        <img 
          src={mercadoPagoLogo} 
          alt="Mercado Pago" 
          style={{ width: "130px", filter: "brightness(0.9)" }}
        />

      </div>

      <p className="text-secondary mt-2" style={{ fontSize: "0.9rem" }}>
        Transferencias, pagos en línea y Mercado Pago disponibles
      </p>
    </div>

  </footer>
);

export default PiePagina;