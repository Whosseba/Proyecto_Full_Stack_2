import React from 'react';
import { motion } from 'framer-motion';
import './PaginaSobreNosotros.css'; // Reutilizamos estilos para mantener la consistencia

const PaginaFAQ = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const faqs = [
    {
      pregunta: "¿Qué medios de pago aceptan?",
      respuesta: "Aceptamos una amplia variedad de medios de pago para tu comodidad, incluyendo tarjetas de crédito y débito a través de Webpay y Mercado Pago, además de transferencias bancarias directas. Tu compra es 100% segura con nosotros."
    },
    {
      pregunta: "¿Cómo funcionan los envíos y retiros?",
      respuesta: "Realizamos envíos a todo Chile a través de transportistas confiables. El costo y tiempo de envío se calculan al finalizar tu compra. Si prefieres, puedes elegir la opción de retiro gratuito en nuestra tienda física en Av. Providencia 1234, Santiago."
    },
    {
      pregunta: "¿Cuál es la política de devoluciones y garantía?",
      respuesta: "Todos nuestros productos cuentan con garantía legal. Si un producto presenta fallas de fábrica, tienes 10 días desde la recepción para solicitar una devolución o cambio. Es importante que el producto esté en su empaque original. Para más detalles, puedes revisar nuestros Términos y Condiciones."
    }
  ];

  return (
    <motion.div
      className="container my-5 sobre-nosotros-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-center mb-5 title-animation">Preguntas Frecuentes</h2>

      {faqs.map((faq, index) => (
        <motion.div 
          key={index} 
          className="section-card" 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible"
          transition={{ delay: index * 0.2 }}
        >
          <h3>{faq.pregunta}</h3>
          <p>{faq.respuesta}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PaginaFAQ;