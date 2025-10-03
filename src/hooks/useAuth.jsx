import { useContext } from "react";
import { ContextoAuth } from "../contextos/ContextoAuth";

export const useAuth = () => useContext(ContextoAuth);
