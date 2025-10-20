
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TarjetaProducto from "../componentes/TarjetaProducto";

const productoMock = {
  id: 1,
  nombre: "Laptop A",
  descripcion: "Laptop potente",
  precio: 1000
};

describe("TarjetaProducto", () => {
  test(" debería renderizar el nombre y precio correctamente", () => {
    render(
      <MemoryRouter>
        <TarjetaProducto producto={productoMock} />
      </MemoryRouter>
    );
    expect(screen.getByText("Laptop A")).toBeInTheDocument();
    expect(screen.getByText("$1000")).toBeInTheDocument();
  });

  test(" debería fallar al buscar un producto inexistente", () => {
    render(
      <MemoryRouter>
        <TarjetaProducto producto={productoMock} />
      </MemoryRouter>
    );
    expect(screen.getByText("Producto Inexistente")).toBeInTheDocument(); // falla a propósito
  });
});
