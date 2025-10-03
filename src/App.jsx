import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProveedorAuth } from "./contextos/ContextoAuth";
import { ProveedorProductos } from "./contextos/ContextoProductos";

import BarraNavegacion from "./componentes/BarraNavegacion";
import PiePagina from "./componentes/PiePagina";

import PaginaLogin from "./paginas/PaginaLogin";
import PaginaRegistro from "./paginas/PaginaRegistro";
import PaginaProductos from "./paginas/PaginaProductos";

function App() {
  return (
    <ProveedorAuth>
      <ProveedorProductos>
        <Router>
          <BarraNavegacion />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<PaginaProductos />} />
              <Route path="/login" element={<PaginaLogin />} />
              <Route path="/registro" element={<PaginaRegistro />} />
            </Routes>
          </div>
          <PiePagina />
        </Router>
      </ProveedorProductos>
    </ProveedorAuth>
  );
}

export default App;
