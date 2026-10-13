
import Label from "../atoms/Label"
import Input from "../atoms/Input"

function FormField({
  id,
  etiqueta,
  tipo = "text",
  placeholder,
  valor,
  onChange
}) {
  return (
    <div className="mb-3">
      <Label texto={etiqueta} htmlFor={id} />
      <Input
        id={id}
        tipo={tipo}
        placeholder={placeholder}
        valor={valor}
        onChange={onChange}
      />
    </div>
  )
}

export default FormField