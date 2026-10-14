
import Label from '../atoms/Label'

function FiltroCategoria({ categorias, valor, onChange }) {
  return (
    <div className="mb-3">
      <Label
        texto="Filtrar por categoría"
        htmlFor="filtro-categoria"
      />

      <select
        id="filtro-categoria"
        className="form-select"
        value={valor}
        onChange={onChange}
      >
        <option value="">Todas las categorías</option>

        {categorias.map(categoria => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FiltroCategoria
