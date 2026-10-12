
function Label({ texto, htmlFor }) {
  return (
    <label className="form-label" htmlFor={htmlFor}>
      {texto}
    </label>
  )
}

export default Label
