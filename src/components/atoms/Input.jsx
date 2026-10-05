function Input({ tipo, placeholder }) {
  return (
    <input
      type={tipo}
      className="form-control"
      placeholder={placeholder}
    />
  )
}

export default Input