import React from "react";

function Button({ children, onClick, className = "btn btn-primary", type = "button" }) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;