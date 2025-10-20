import React from "react";

const Categoria = ({ productos }) => {
  return (
    <div className="row">
      {productos.map(producto => (
        <div key={producto.id} className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0" style={{ borderRadius: "12px", transition: "transform 0.3s, box-shadow 0.3s" }}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="card-img-top"
              style={{ objectFit: "cover", height: "200px" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{producto.nombre}</h5>
              <p className="card-text">{producto.descripcion}</p>
              <p className="card-text fw-bold text-primary">${producto.precio}</p>
              <button className="btn btn-outline-primary w-100 mt-2">
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
