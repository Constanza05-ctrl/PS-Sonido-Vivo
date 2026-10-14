
import Input from '../atoms/Input'
import Label from '../atoms/Label'

function BarraBusqueda({ valor, onChange }) {
  return (
    <div className="mb-3">
      <Label
        texto="Buscar producto"
        htmlFor="busqueda-producto"
      />

      <Input
        id="busqueda-producto"
        tipo="text"
        placeholder="Ej. Yamaha, guitarra, teclado..."
        valor={valor}
        onChange={onChange}
      />
    </div>
  )
}

export default BarraBusqueda
