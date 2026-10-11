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
  required = false
}) {
  const fieldId = id ?? name
  const fieldLabel = etiqueta ?? label
  const fieldType = tipo ?? type ?? "text"
  const fieldValue = valor ?? value

  return (
    <div className="mb-3">
      <Label texto={fieldLabel} htmlFor={fieldId} />

      <Input
        id={fieldId}
        tipo={fieldType}
        placeholder={placeholder}
        valor={fieldValue}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

export default FormField