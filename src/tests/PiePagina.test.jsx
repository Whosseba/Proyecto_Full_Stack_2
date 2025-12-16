import { render, screen } from "@testing-library/react";
import PiePagina from "../componentes/PiePagina";

describe("PiePagina", () => {
  const contenido = "TechStore © 2025 - Todos los derechos reservados";

  test(" debería renderizar correctamente el texto principal", () => {
    render(<PiePagina />);
    expect(screen.getByText(contenido)).toBeInTheDocument(); // pasa
  });

  test(" funcional: debería mostrar la dirección de la tienda", () => {
    render(<PiePagina />);
    expect(screen.getByText(/Av\. Providencia 1234/)).toBeInTheDocument(); // funcional
  });

  test("debería fallar al buscar un correo inexistente", () => {
    render(<PiePagina />);
    expect(screen.getByText("correo@inexistente.com")).toBeInTheDocument(); // falla a propósito
  });
});
