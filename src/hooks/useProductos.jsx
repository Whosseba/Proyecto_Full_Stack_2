import { useContext } from "react";
import { ContextoProductos } from "../contextos/ContextoProductos";

export const useProductos = () => useContext(ContextoProductos);
