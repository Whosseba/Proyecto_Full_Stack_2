import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProveedorAuth } from "./contextos/ContextoAuth";
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

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  return (
    <ProveedorAuth>
      <ProveedorProductos>
        <ProveedorCarrito> 
          <Router>
            <div className="d-flex flex-column min-vh-100">
              <BarraNavegacion />
              <div className="container mt-5 pt-4">
                <Routes>
                  <Route path="/" element={<PaginaProductos />} />
                  <Route path="/login" element={<PaginaLogin />} />
                  <Route path="/registro" element={<PaginaRegistro />} />
                  <Route path="/categoria/:categoria" element={<PaginaProductos />} />
                  <Route path="/producto/:id" element={<DetalleProducto />} />
                  <Route path="/carrito" element={<PaginaCarrito />} />          
    
                  <Route path="/checkout" element={<PaginaCheckout />} />        
                  <Route path="/confirmacion" element={<PaginaConfirmacion />} />
                </Routes>
              </div>
              <PiePagina />
            </div>
          </Router>
        </ProveedorCarrito>
      </ProveedorProductos>
    </ProveedorAuth>
  );
}

export default App;
