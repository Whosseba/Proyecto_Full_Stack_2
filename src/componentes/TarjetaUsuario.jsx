const TarjetaUsuario = ({ usuario }) => (
  <div className="card m-2" style={{ width: "18rem" }}>
    <div className="card-body">
      <h5 className="card-title">{usuario.nombre}</h5>
      <p className="card-text">{usuario.email}</p>
    </div>
  </div>
);

export default TarjetaUsuario;
