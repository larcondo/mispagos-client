import './index.css'
import { monthToText } from '../../helpers/general'
import { filterChange } from '../../reducers/filtrosReducer'
import { useSelector, useDispatch } from 'react-redux'

const Filtros = ({ options, filtrovis }) => {
  const dispatch = useDispatch()
  const filtro = useSelector(state => state.filter)
  
  if (!options) return null

  return(
    <div id='contenedor-filtros' style={{ display: filtrovis ? 'flex' : 'none' }}>
      <FiltroSelect name='select-tipo' label='Tipo:'
        values={options.tipos}
        onChange={e => dispatch(filterChange({ ...filtro, tipo: e.target.value}))}
      />

      <FiltroSelect name='select-detalle' label='Detalle:'
        values={options.detalles}
        onChange={e => dispatch(filterChange({ ...filtro, detalle: e.target.value}))}
      />

      <FiltroSelect name='select-anio' label='Año:'
        values={options.years}
        onChange={e => dispatch(filterChange({ ...filtro, year: e.target.value}))}
      />
      <FiltroSelect name='select-mes' label='Mes:'
        values={options.months}
        modifier={monthToText}
        onChange={e => dispatch(filterChange({ ...filtro, month: e.target.value}))}
      />
      
      <FiltroInput name='filtroObs' label='Observaciones:'
        onChange={e => dispatch(filterChange({ ...filtro, obs: e.target.value}))}
      />
    </div>
  )
}

const FiltroSelect = ({ name, label, values, onChange, modifier = null }) => {
  if(!values) return null
  
  return(
    <div className='filtro'>
      <label htmlFor={name}>{ label }</label>
      <select name={name} id={name} onChange={onChange}>
        <option value='Todos'>Todos</option>
        { values.map( (op, index) => {
          return <option value={op} key={index}>
            { modifier ? modifier(op) : op }
          </option>
        })}
      </select>
    </div>
  )
}

const FiltroInput = ({ name, label, onChange }) => {
  return(
    <div className='filtro'>
      <label htmlFor={name}>{ label }</label>
      <input type='text' name={name} id={name} onChange={onChange} />
    </div>
  )
}


export default Filtros