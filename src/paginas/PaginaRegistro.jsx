import { useState } from "react";
import { useAuth } from "../contextos/ContextoAuth";
import { useNavigate } from "react-router-dom";

const PaginaRegistro = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [rut, setRut] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");

  const [errorRut, setErrorRut] = useState("");
  const [errorRegistro, setErrorRegistro] = useState("");

  // Validación RUT
  const validarRut = (rutCompleto) => {
    rutCompleto = rutCompleto.replace(/\./g, "").replace(/-/g, "").toUpperCase();
    if (!/^[0-9]+[0-9K]$/.test(rutCompleto)) return false;

    const cuerpo = rutCompleto.slice(0, -1);
    const dv = rutCompleto.slice(-1);

    let suma = 0;
    let multiplo = 2;

    for (let i = 1; i <= cuerpo.length; i++) {
      suma += multiplo * rutCompleto.charAt(cuerpo.length - i);
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    const dvCalculado =
      dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

    return dvCalculado === dv;
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setErrorRut("");
    setErrorRegistro("");

    if (!validarRut(rut)) {
      setErrorRut("El RUT ingresado no es válido");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombreCompleto,
          email: email,
          password: contrasena,
          role: "USER",
          region: region,
          comuna: comuna,
          direccion: direccion
        })
      });

      if (response.ok) {
        const exitoLogin = await login(email, contrasena);

        if (exitoLogin) {
          alert("¡Registro exitoso! Bienvenido.");
          navigate("/");
        } else {
          alert("Registro exitoso. Por favor inicia sesión.");
          navigate("/login");
        }
      } else {
        setErrorRegistro("Error al registrar. El correo podría estar en uso.");
      }
    } catch (error) {
      console.error(error);
      setErrorRegistro("Error de conexión con el servidor.");
    }
  };

  // --- ESTILOS ---
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 56px - 72px)", // Ajustado para consistencia
    background: "#212529", // Fondo gris oscuro y sólido
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardStyle = {
    background: "#343a40", // Tarjeta opaca
    padding: "30px 40px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Sombra sutil
    width: "400px",
    color: "#fff",
    textAlign: "center",
    border: "1px solid #495057" // Borde sutil
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #6c757d",
    outline: "none",
    backgroundColor: "#495057",
    color: "#fff",
    fontSize: "16px",
    transition: "all 0.3s",
  };

  const selectStyle = {
    ...inputStyle, // Hereda el estilo de los inputs
    cursor: "pointer",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none", // Coincide con el botón de login
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
  };

  const errorStyle = {
    color: "#dc3545", // Coincide con el color de error de login
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
        <h2 style={{ marginBottom: "20px" }}>
          Registro de Usuario
        </h2>

        {errorRut && <p style={errorStyle}>{errorRut}</p>}
        {errorRegistro && <p style={errorStyle}>{errorRegistro}</p>}

        <form onSubmit={handleRegistro}>
          <input
            type="text"
            placeholder="RUT (12345678-9)"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = "#0d6efd"}
            onBlur={(e) => e.currentTarget.style.borderColor = "#6c757d"}
          />

          <input
            type="text"
            placeholder="Nombre completo"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = "#0d6efd"}
            onBlur={(e) => e.currentTarget.style.borderColor = "#6c757d"}
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = "#0d6efd"}
            onBlur={(e) => e.currentTarget.style.borderColor = "#6c757d"}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = "#0d6efd"}
            onBlur={(e) => e.currentTarget.style.borderColor = "#6c757d"}
          />

          {/* SELECT COMPLETO DE REGIONES */}
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
            style={selectStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = "#0d6efd"}
            onBlur={(e) => e.currentTarget.style.borderColor = "#6c757d"}
          >
            <option value="" disabled>Selecciona tu región</option>

            {/* NORTE */}
            <optgroup label="🌵 Zona Norte">
              <option value="Región de Arica y Parinacota">Arica y Parinacota</option>
              <option value="Región de Tarapacá">Tarapacá</option>
              <option value="Región de Antofagasta">Antofagasta</option>
              <option value="Región de Atacama">Atacama</option>
              <option value="Región de Coquimbo">Coquimbo</option>
            </optgroup>

            {/* CENTRO */}
            <optgroup label="🏙️ Zona Centro">
              <option value="Región de Valparaíso">Valparaíso</option>
              <option value="Región Metropolitana">Región Metropolitana</option>
              <option value="Región de O'Higgins">O'Higgins</option>
              <option value="Región del Maule">Maule</option>
              <option value="Región del Ñuble">Ñuble</option>
              <option value="Región del Biobío">Biobío</option>
            </optgroup>

            {/* SUR */}
            <optgroup label="🌲 Zona Sur">
              <option value="Región de La Araucanía">La Araucanía</option>
              <option value="Región de Los Ríos">Los Ríos</option>
              <option value="Región de Los Lagos">Los Lagos</option>
              <option value="Región de Aysén">Aysén</option>
              <option value="Región de Magallanes">Magallanes</option>
            </optgroup>
          </select>

          <input
            type="text"
            placeholder="Comuna"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = "#0d6efd"}
            onBlur={(e) => e.currentTarget.style.borderColor = "#6c757d"}
          />

          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = "#0d6efd"}
            onBlur={(e) => e.currentTarget.style.borderColor = "#6c757d"}
          />

          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
          >
            Registrarse
          </button>
        </form>

        <p style={footerStyle}>
          ¿Ya tienes cuenta?
          <a href="/login" style={{ color: "#0d6efd", textDecoration: "underline" }}>
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaginaRegistro;