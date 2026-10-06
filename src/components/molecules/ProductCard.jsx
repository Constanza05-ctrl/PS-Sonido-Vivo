import React from "react";

function ProductCard({ producto }) {
  const { nombre, marca, modelo, precio, stock, descripcion, categoria } = producto;

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary mb-2 align-self-start">
          {categoria}
        </span>
        <h5 className="card-title text-primary fw-bold mb-1">{nombre}</h5>
        <h6 className="card-subtitle mb-3 text-muted small">
          {marca} {modelo && `— ${modelo}`}
        </h6>
        <p className="card-text text-secondary flex-grow-1 small">
          {descripcion}
        </p>
        <div className="pt-2 border-top mt-2 d-flex justify-content-between align-items-center">
          <span className="fw-bold fs-5 text-success">
            ${precio ? precio.toLocaleString("es-CL") : 0}
          </span>
          <span className={`badge ${stock > 0 ? "bg-info text-dark" : "bg-danger"}`}>
            Stock: {stock}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;