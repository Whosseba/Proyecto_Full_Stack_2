import React from "react";

const Categoria = ({ productos }) => {
  return (
    <div className="row">
      {productos.map((producto) => (
        <div key={producto.id} className="col-md-4 mb-4">
          <div
            className="card h-100 border-0"
            style={{
              borderRadius: "15px",
              background: "rgba(30, 30, 40, 0.9)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(0,255,255,0.2)",
              transition: "transform 0.3s, box-shadow 0.3s",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,255,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,255,0.2)";
            }}
          >
            <div
              style={{
                height: "200px",
                backgroundImage: `url(${producto.imagen})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "transform 0.5s",
              }}
            />
            <div className="card-body text-center">
              <h5
                className="card-title"
                style={{
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  color: "#00ffff",
                  textShadow: "0 0 5px #00ffff",
                }}
              >
                {producto.nombre}
              </h5>
              <p style={{ fontSize: "0.9rem", color: "#ccc" }}>{producto.descripcion}</p>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "#0ff",
                  textShadow: "0 0 5px #0ff",
                }}
              >
                ${producto.precio}
              </p>
              <button
                className="btn w-100 mt-2"
                style={{
                  background: "linear-gradient(90deg, #00ffff, #ff00ff)",
                  border: "none",
                  color: "#000",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.filter = "brightness(1.2) drop-shadow(0 0 8px #0ff)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1) drop-shadow(0 0 0)")}
              >
                Ver más
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categoria;
