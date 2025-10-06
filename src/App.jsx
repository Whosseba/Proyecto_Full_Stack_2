import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProveedorAuth } from "./contextos/ContextoAuth";
import { ProveedorProductos } from "./contextos/ContextoProductos";

import BarraNavegacion from "./componentes/BarraNavegacion";
import PiePagina from "./componentes/PiePagina";

import PaginaLogin from "./paginas/PaginaLogin";
import PaginaRegistro from "./paginas/PaginaRegistro";
import PaginaProductos from "./paginas/PaginaProductos";
import Laptops from "./paginas/Laptops";
import Mouses from "./paginas/Mouses";

function App() {
  return (
    <ProveedorAuth>
      <ProveedorProductos>
        <Router>
          <BarraNavegacion />
          <div className="container mt-5 pt-4">
            <Routes>
              <Route path="/" element={<PaginaProductos />} />
              <Route path="/login" element={<PaginaLogin />} />
              <Route path="/registro" element={<PaginaRegistro />} />
              <Route path="/laptops" element={<Laptops />} />
              <Route path="/mouses" element={<Mouses />} />
            </Routes>
          </div>
          <PiePagina />
        </Router>
      </ProveedorProductos>
    </ProveedorAuth>
  );
}

export default App;
