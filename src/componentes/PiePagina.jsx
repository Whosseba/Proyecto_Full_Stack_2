import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaCreditCard, 
  FaUniversity, 
  FaMoneyBillWave, 
  FaLandmark 
} from 'react-icons/fa';
import { SiMercadopago } from 'react-icons/si';
import './PiePagina.css';

const PiePagina = () => (
  <footer className="pie-pagina">
    <div className="container">
      <div className="footer-section">
        <h5>Sobre Nosotros</h5>
        <p>TechStore es tu tienda de confianza para la mejor tecnología. Ofrecemos productos de alta calidad y un servicio al cliente excepcional.</p>
      </div>
      <div className="footer-section">
        <h5>Atención al Cliente</h5>
        <ul>
          <li><Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li><Link to="/politica-de-privacidad">Política de Privacidad</Link></li>
          <li><Link to="/terminos-y-condiciones">Términos y Condiciones</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h5>Horario de Atención</h5>
        <p><strong>Tienda y Punto de Retiro:</strong></p>
        <ul className="list-unstyled">
          <li>Lunes a Jueves: 09:00 a 19:00</li>
          <li>Viernes: 09:00 a 18:00</li>
        </ul>
      </div>
      <div className="footer-section">
        <h5>Medios de Pago</h5>
        <div className="medios-pago-container">
            <FaCreditCard title="Webpay" className="logo-pago-icon" />
            <SiMercadopago title="Mercado Pago" className="logo-pago-icon" />
            <FaLandmark title="Santander" className="logo-pago-icon" />
            <FaUniversity title="Banco Estado" className="logo-pago-icon" />
            <FaMoneyBillWave title="Transferencia" className="logo-pago-icon" />
        </div>
      </div>
      <div className="footer-section">
        <h5>Síguenos</h5>
        <p>Mantente conectado con nosotros en nuestras redes sociales.</p>
        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>TechStore © {new Date().getFullYear()} - Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default PiePagina;