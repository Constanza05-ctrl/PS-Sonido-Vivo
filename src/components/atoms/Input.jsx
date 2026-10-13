
function Input({ id, tipo = "text", placeholder, valor, onChange }) {
  return (
    <input
      id={id}
      type={tipo}
      className="form-control"
      placeholder={placeholder}
      value={valor}
      onChange={onChange}
    />
  )
}

export default Input
