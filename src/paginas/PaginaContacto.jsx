import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { SiMercadopago } from 'react-icons/si';

import logoSantander from '../imagenes/logos_ventas/logo_banco_santander.jpg';
import logoBancoEstado from '../imagenes/logos_ventas/logo_banco_estado.png';
import logoBancoChile from '../imagenes/logos_ventas/Logo_banco_chile.jpg';

import './PaginaSobreNosotros.css'; // Reutilizamos estilos para mantener la consistencia

const PaginaContacto = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="container my-5 sobre-nosotros-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-center mb-4 title-animation">Contacto</h2>
      
      <motion.div className="section-card contact-info" variants={cardVariants} initial="hidden" animate="visible">
        <h3><FaMapMarkerAlt className="icon" /> Contacto y Ubicación</h3>
        <p><FaMapMarkerAlt className="icon" /> <strong>Dirección:</strong> Av. Providencia 1234, Santiago, Chile</p>
        <p><FaPhone className="icon" /> <strong>Teléfono:</strong> +56 9 1234 5678</p>
        <p><FaEnvelope className="icon" /> <strong>Email:</strong> contacto@techstore.cl</p>

        <div className="horario-atencion-card mt-4">
          <h5 className="card-title"><FaClock className="me-2" />Horario de Atención</h5>
          <p className="card-text mb-1"><strong>Tienda y Punto de Retiro:</strong></p>
          <ul className="list-unstyled mb-0">
            <li>Lunes a Jueves: 09:00 a 19:00</li>
            <li>Viernes: 09:00 a 18:00</li>
          </ul>
        </div>
      </motion.div>

      <motion.div className="section-card mt-4" variants={cardVariants} initial="hidden" animate="visible">
        <h3>Medios de Pago</h3>
        <div className="medios-pago-container">
            <FaCreditCard title="Webpay" className="logo-pago-icon" />
            <SiMercadopago title="Mercado Pago" className="logo-pago-icon" />
            <FaMoneyBillWave title="Transferencia" className="logo-pago-icon" />
            <img src={logoSantander} alt="Banco Santander" title="Banco Santander" className="logo-pago-img" />
            <img src={logoBancoEstado} alt="Banco Estado" title="Banco Estado" className="logo-pago-img" />
            <img src={logoBancoChile} alt="Banco de Chile" title="Banco de Chile" className="logo-pago-img" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaginaContacto;