import React from "react";
import PublicTemplate from "../components/templates/PublicTemplate";
import ProductCard from "../components/molecules/ProductCard";
import productos from "../data/productos.js";

function Catalogo() {
  return (
    <PublicTemplate>
      <div className="container my-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">Catálogo de Productos</h1>
          <p className="text-muted">
            Explora nuestra gran variedad de instrumentos y equipos de audio.
          </p>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {productos && productos.map((prod) => (
            <div className="col" key={prod.id}>
              <ProductCard producto={prod} />
            </div>
          ))}
        </div>
      </div>
    </PublicTemplate>
  );
}

export default Catalogo;