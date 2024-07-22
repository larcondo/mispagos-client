import './index.css';
import { monthToText } from '@helpers/general';
import { filterChange } from '@reducers/filtrosReducer';
import { useSelector, useDispatch } from 'react-redux';

import FiltroSelect from './FiltroSelect';
import FiltroInput from './FiltroInput';

const Filtros = ({ options, filtrovis }) => {
  const dispatch = useDispatch();
  const filtro = useSelector(state => state.filter);

  if (!options) return null;

  return(
    <div id='contenedor-filtros' style={{ display: filtrovis ? 'flex' : 'none' }}>
      <FiltroSelect name='select-tipo' label='Tipo:'
        values={options.tipos}
        onChange={e => dispatch(filterChange({ ...filtro, tipo: e.target.value }))}
      />

      <FiltroSelect name='select-detalle' label='Detalle:'
        values={options.detalles}
        onChange={e => dispatch(filterChange({ ...filtro, detalle: e.target.value }))}
      />

      <FiltroSelect name='select-anio' label='Año:'
        values={options.years}
        onChange={e => dispatch(filterChange({ ...filtro, year: e.target.value }))}
      />
      <FiltroSelect name='select-mes' label='Mes:'
        values={options.months}
        modifier={monthToText}
        onChange={e => dispatch(filterChange({ ...filtro, month: e.target.value }))}
      />

      <FiltroInput name='filtroObs' label='Observaciones:'
        onChange={e => dispatch(filterChange({ ...filtro, obs: e.target.value }))}
      />
    </div>
  );
};

export default Filtros;