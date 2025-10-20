import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BarraNavegacion from "../componentes/BarraNavegacion";
import { vi } from "vitest";


vi.mock("../contextos/ContextoAuth", () => ({
  useAuth: () => ({
    usuario: { nombre: "Sebastián" },
    logout: vi.fn(),
  }),
}));

//  1. Prueba FUNCIONAL 
test("debe mostrar el nombre del usuario logueado", () => {
  render(
    <MemoryRouter>
      <BarraNavegacion />
    </MemoryRouter>
  );

  expect(screen.getByText("Sebastián")).toBeInTheDocument();
});


//  2. Prueba con ERROR intencional
test("debe fallar al no encontrar el texto 'Cerrar sesión ahora'", () => {
  render(
    <MemoryRouter>
      <BarraNavegacion />
    </MemoryRouter>
  );

  expect(screen.getByText("Cerrar sesión ahora")).toBeInTheDocument();
});


//  3. Prueba que pasa 
test("debe mostrar el enlace de 'Laptops' dentro del menú Categorías", () => {
  render(
    <MemoryRouter>
      <BarraNavegacion />
    </MemoryRouter>
  );

  const enlace = screen.getByText("Laptops");
  expect(enlace).toBeInTheDocument();
});