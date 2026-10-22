
function CantidadInput({ cantidad, onChange }) {
  return (
    <input
      type="number"
      className="form-control"
      aria-label="Cantidad"
      min="1"
      step="1"
      value={cantidad}
      onChange={event => onChange(event.target.value)}
    />
  )
}

export default CantidadInput
