
function Button({ texto, onClick, tipo = "button" }) {
  return (
    <button
      type={tipo}
      className="btn btn-primary"
      onClick={onClick}
    >
      {texto}
    </button>
  )
}

export default Button
