import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProveedorAuth } from "./contextos/ContextoAuth";
import { ProveedorProductos } from "./contextos/ContextoProductos";

import BarraNavegacion from "./componentes/BarraNavegacion";
import PiePagina from "./componentes/PiePagina";

import PaginaLogin from "./paginas/PaginaLogin";
import PaginaRegistro from "./paginas/PaginaRegistro";
import PaginaProductos from "./paginas/PaginaProductos";
import DetalleProducto from "./paginas/DetalleProducto";

function App() {
  return (
    <ProveedorAuth>
      <ProveedorProductos>
        <Router>

          <div className="d-flex flex-column min-vh-100">

          <BarraNavegacion />
          <div className="container mt-5 pt-4 flex-grow-1">
            <Routes>
              <Route path="/" element={<PaginaProductos />} />
              <Route path="/login" element={<PaginaLogin />} />
              <Route path="/registro" element={<PaginaRegistro />} />
              <Route path="/categoria/:categoria" element={<PaginaProductos />} />
              <Route path="/producto/:id" element={<DetalleProducto />} />
            </Routes>
          </div>
          <PiePagina />
          </div>
        </Router>
      </ProveedorProductos>
    </ProveedorAuth>
  );
}

export default App;
