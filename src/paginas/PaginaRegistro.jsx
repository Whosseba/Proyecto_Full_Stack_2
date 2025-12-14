import { useState } from "react";
import { useAuth } from "../contextos/ContextoAuth";
import { useNavigate } from "react-router-dom";

import "./PaginaRegistro.css"; // Importar el nuevo archivo CSS
const PaginaRegistro = () => {
  const { login } = useAuth(); // Usaremos esto para auto-login después de registrar
  const navigate = useNavigate();

  // Estados del formulario
  const [rut, setRut] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  
  // Estados de error
  const [errorRut, setErrorRut] = useState("");
  const [errorRegistro, setErrorRegistro] = useState("");

  // Función para validar RUT chileno
  const validarRut = (rutCompleto) => {
    rutCompleto = rutCompleto.replace(/\./g, "").replace(/-/g, "").toUpperCase();
    if (!/^[0-9]+[0-9K]$/.test(rutCompleto)) return false;
    const cuerpo = rutCompleto.slice(0, -1);
    const dv = rutCompleto.slice(-1);
    let suma = 0;
    let multiplo = 2;
    for (let i = 1; i <= cuerpo.length; i++) {
      const index = multiplo * rutCompleto.charAt(cuerpo.length - i);
      suma += index;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const dvEsperado = 11 - (suma % 11);
    let dvCalculado =
      dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();
    return dvCalculado === dv;
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setErrorRut("");
    setErrorRegistro("");
    
    // 1. Validar RUT (Lógica Frontend)
    if (!validarRut(rut)) {
      setErrorRut("El RUT ingresado no es válido");
      return;
    }

    try {
        // 2. CONEXIÓN AL BACKEND: Crear usuario
        // Nota: Aunque pedimos RUT y Ubicación, el backend actual solo guarda nombre, email, pass y rol.
        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: nombreCompleto,
                email: email,
                password: contrasena,
                role: "USER" // Todo registro nuevo es USER por defecto
            })
        });

        if (response.ok) {
            // 3. Si se registró bien, hacemos Login automático
            // Aquí usamos la función login actualizada que espera (email, password)
            const exitoLogin = await login(email, contrasena);
            
            if (exitoLogin) {
                alert("¡Registro exitoso! Bienvenido.");
                navigate("/"); // Vamos al home
            } else {
                // Si falla el login automático, mandamos al login manual
                alert("Registro exitoso. Por favor inicia sesión.");
                navigate("/login");
            }
        } else {
            setErrorRegistro("Error al registrar. Es posible que el correo ya esté en uso.");
        }
    } catch (error) {
        console.error(error);
        setErrorRegistro("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h2>Registro de Usuario</h2>
        
        {/* Mensajes de Error */}
        {errorRut && <p className="error-message">{errorRut}</p>}
        {errorRegistro && <p className="error-message">{errorRegistro}</p>}
        
        <form onSubmit={handleRegistro}>
          <input
            type="text"
            placeholder="RUT (12345678-9)"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
            className="registro-input"
          />
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            required
            className="registro-input"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="registro-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            className="registro-input"
          />
          <input
            type="text"
            placeholder="Ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
            className="registro-input"
          />
          <button
            type="submit"
            className="registro-button"
          >
            Registrarse
          </button>
        </form>
        <p className="registro-footer">
          ¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a>
        </p>
      </div>
    </div>
  );
};

export default PaginaRegistro;