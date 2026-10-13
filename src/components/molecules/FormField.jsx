<<<<<<< HEAD
import Label from "../atoms/Label"
import Input from "../atoms/Input"

function FormField({
  id,
  etiqueta,
  tipo = "text",
  placeholder = "",
  valor,
  onChange,
  label,
  name,
  type,
  value,
=======
function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
>>>>>>> ca22102 (ajustar merge rama thian)
  required = false
}) {
  const fieldId = id ?? name
  const fieldLabel = etiqueta ?? label
  const fieldType = tipo ?? type ?? "text"
  const fieldValue = valor ?? value

  return (
    <div className="mb-3">
<<<<<<< HEAD
      <Label texto={fieldLabel} htmlFor={fieldId} />

      <Input
        id={fieldId}
        tipo={fieldType}
        placeholder={placeholder}
        valor={fieldValue}
        onChange={onChange}
        required={required}
=======
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="form-control"
>>>>>>> ca22102 (ajustar merge rama thian)
      />
    </div>
  )
}

export default FormField