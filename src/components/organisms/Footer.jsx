import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-1 fw-bold">Sonido Vivo © {new Date().getFullYear()}</p>
        <small className="text-muted">Tienda de Instrumentos Musicales y Equipos de Sonido</small>
      </div>
    </footer>
  );
}

export default Footer;