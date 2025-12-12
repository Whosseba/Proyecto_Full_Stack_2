import { useState } from "react";
import { useAuth } from "../contextos/ContextoAuth";
import { useNavigate, Link } from "react-router-dom"; 
import "./PaginaLogin.css";

const PaginaLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensajeError(""); 

    const exito = await login(email, password);

    if (exito) {
      navigate("/"); 
    } else {
      setMensajeError("Credenciales incorrectas. Verifica tu email y contraseña.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        
        {mensajeError && <p className="error-message">{mensajeError}</p>}
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />

          <button
            type="submit"
            className="login-button"
          >
            Entrar
          </button>
        </form>
        
        <p className="login-footer">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default PaginaLogin;