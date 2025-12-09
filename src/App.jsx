import { Routes, Route, Navigate } from "react-router-dom";
import { ProveedorAuth, useAuth } from "./contextos/ContextoAuth";
import { ProveedorProductos } from "./contextos/ContextoProductos";
import { ProveedorCarrito } from "./contextos/ContextoCarrito";

import BarraNavegacion from "./componentes/BarraNavegacion";
import PiePagina from "./componentes/PiePagina";

import PaginaLogin from "./paginas/PaginaLogin";
import PaginaRegistro from "./paginas/PaginaRegistro";
import PaginaProductos from "./paginas/PaginaProductos";
import DetalleProducto from "./paginas/DetalleProducto";
import PaginaCarrito from "./paginas/PaginaCarrito";
import PaginaCheckout from "./paginas/PaginaCheckout";
import PaginaConfirmacion from "./paginas/PaginaConfirmacion";
import PaginaAdmin from "./paginas/admin/PaginaAdmin"; 
import PaginaSobreNosotros from "./paginas/PaginaSobreNosotros";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';

// --- GUARDIA: SOLO ADMIN ---
const RutaAdmin = ({ children }) => {
  // Asegúrate de que useAuth exporte 'inicializando'
  const { autenticado, role, inicializando } = useAuth();
  
  if (inicializando) {
      // Bloquea la decisión hasta que se haya leído localStorage
      return <div className="text-center mt-5 pt-5 text-white"><div className="spinner-border text-info"></div></div>;
  }
  
  if (!autenticado || role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }
  return children;
};

// --- GUARDIA: USUARIOS REGISTRADOS ---
const RutaProtegida = ({ children }) => {
  const { autenticado, inicializando } = useAuth();

  if (inicializando) {
      // Bloquea la decisión hasta que se haya leído localStorage
      return <div className="text-center mt-5 pt-5 text-white"><div className="spinner-border text-info"></div></div>;
  }
  
  if (!autenticado) return <Navigate to="/login" replace />;
  return children;
};

import SubBarraNavegacion from "./componentes/SubBarraNavegacion";

// ... (resto de los imports)

function App() {
  return (
    <ProveedorAuth>
      <ProveedorProductos>
        <ProveedorCarrito>
          <div className="d-flex flex-column min-vh-100">
            <BarraNavegacion />
            <SubBarraNavegacion />
            <div className="container-fluid">
              <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<PaginaProductos />} />
                <Route path="/login" element={<PaginaLogin />} />
                <Route path="/registro" element={<PaginaRegistro />} />
                <Route path="/productos/:categoria" element={<PaginaProductos />} />
                <Route path="/producto/:id" element={<DetalleProducto />} />
                <Route path="/carrito" element={<PaginaCarrito />} />
                <Route path="/sobre-nosotros" element={<PaginaSobreNosotros />} />

                {/* Rutas Privadas (Cualquier usuario) */}
                <Route path="/checkout" element={<RutaProtegida><PaginaCheckout /></RutaProtegida>} />
                <Route path="/confirmacion" element={<RutaProtegida><PaginaConfirmacion /></RutaProtegida>} />

                {/* Ruta Admin (Solo el Jefe) */}
                <Route path="/admin" element={<RutaAdmin><PaginaAdmin /></RutaAdmin>} />
              </Routes>
            </div>
            <PiePagina />
          </div>
        </ProveedorCarrito>
      </ProveedorProductos>
    </ProveedorAuth>
  );
}

export default App;