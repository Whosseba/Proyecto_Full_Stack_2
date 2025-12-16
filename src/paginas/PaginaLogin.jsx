import { useState } from "react";
import { useAuth } from "../contextos/ContextoAuth";
import { useNavigate, Link } from "react-router-dom"; 

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

  // --- ESTILOS ---
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 56px - 72px)",
    background: "#212529", // Un fondo gris oscuro y sólido
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardStyle = {
    background: "#343a40", // Tarjeta opaca
    padding: "35px 45px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Sombra sutil
    width: "360px",
    color: "#fff",
    textAlign: "center",
    border: "1px solid #495057" // Borde sutil
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "12px 0",
    borderRadius: "8px",
    border: "1px solid #6c757d",
    backgroundColor: "#495057",
    color: "#fff",
    outline: "none",
    fontSize: "16px",
    transition: "all 0.3s",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const errorStyle = {
    color: "#dc3545",
    marginBottom: "10px",
    fontWeight: "bold",
    fontSize: "14px"
  };

  const footerStyle = {
    marginTop: "15px",
    fontSize: "14px",
    color: "#ccc"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "25px" }}>Iniciar Sesión</h2>
        
        {mensajeError && <p style={errorStyle}>{mensajeError}</p>}
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle} // Estilo base
            onFocus={(e) => e.currentTarget.style.borderColor = "#0d6efd"}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#6c757d";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle} // Estilo base
            onFocus={(e) => e.currentTarget.style.borderColor = "#0d6efd"}
            onBlur={(e) => e.currentTarget.style.borderColor = "#6c757d"}
          />

          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#0056b3"; // Azul más oscuro al pasar el mouse
            }}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
          >
            Entrar
          </button>
        </form>
        
        <p style={footerStyle}>
          ¿No tienes cuenta? <Link to="/registro" style={{ color: "#0d6efd", textDecoration: "underline" }}>Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default PaginaLogin;