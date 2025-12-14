import { motion } from 'framer-motion';
import { FaStore, FaUserFriends, FaCode } from 'react-icons/fa';

import './PaginaSobreNosotros.css';

const PaginaSobreNosotros = () => {
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
      <h2 className="text-center mb-4 title-animation">Sobre Nosotros</h2>
      
      <motion.div className="section-card" variants={cardVariants} initial="hidden" animate="visible">
        <h3><FaStore className="icon" /> Nuestra Historia</h3>
        <p>
          Nacimos de la pasión por la tecnología y los videojuegos. Nuestra misión es ofrecer a nuestros clientes los mejores productos tecnológicos para llevar su experiencia al siguiente nivel, ya sea para gaming, trabajo o entretenimiento.
        </p>
      </motion.div>

      <motion.div className="section-card" variants={cardVariants} initial="hidden" animate="visible">
        <h3><FaUserFriends className="icon" /> Los Creadores</h3>
        <div className="row">
          <div className="col-md-6">
            <div className="creadores-card">
              <FaCode className="icon" />
              <h4>Sebastian</h4>
              <p>Apasionado por el hardware y el rendimiento, siempre en busca de los componentes más potentes del mercado.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="creadores-card">
              <FaCode className="icon" />
              <h4>Cristobal</h4>
              <p>Experto en periféricos y ergonomía, dedicado a encontrar la configuración perfecta para cada jugador.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaginaSobreNosotros;