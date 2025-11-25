import { render, screen } from "@testing-library/react";
import Categoria from "../componentes/Categoria";

describe("Tests para el componente Categoria", () => {
  const productosMock = [
    { id: 1, nombre: "Laptop A", descripcion: "Laptop potente", precio: 1000, imagen: "lapA.jpg" },
    { id: 2, nombre: "Mouse B", descripcion: "Mouse ergonómico", precio: 50, imagen: "mouseB.jpg" },
  ];

  // Test que pasa
  test(" debería renderizar un solo producto correctamente", () => {
    render(<Categoria productos={[productosMock[0]]} />);
    expect(screen.getByText("Laptop A")).toBeInTheDocument();
  });

  //  Test funcional
  test("debería renderizar todos los productos correctamente", () => {
    render(<Categoria productos={productosMock} />);
    expect(screen.getByText("Laptop A")).toBeInTheDocument();
    expect(screen.getByText("Mouse B")).toBeInTheDocument();
  });

  //  Test que falla a propósito
  test(" debería fallar al buscar un producto que no existe", () => {
    render(<Categoria productos={productosMock} />);
    expect(screen.getByText("Teclado Inexistente")).toBeInTheDocument();
  });
});
