
import React from "react";

function Button({
  children,
  texto,
  onClick,
  className = "btn btn-primary",
  type = "button",
  tipo,
}) {
  return (
    <button
      type={tipo || type}
      className={className}
      onClick={onClick}
    >
      {children ?? texto}
    </button>
  );
}

export default Button;
