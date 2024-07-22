import './index.css';

import { numberToCurrency } from '@helpers/general';
import { MdFilterListAlt } from 'react-icons/md';

const styleIcons = {
  position: 'relative', top: '2px'
};

const Acciones = ({ pagos, setModalAdd, filtrovis, setFiltrovis }) => {
  return(
    <div id='contenedor-acciones'>

      <div id='pagos-info'>
        <span>
          <span id="pagos-entradas-valor">{ pagos.length }</span> <span id="pagos-entradas">entradas</span>
        </span>
        <span>
          <span id="pagos-total-valor">{ numberToCurrency(pagos.reduce( (acc, val) => acc + val.importe, 0.0 )) }</span> <span id="pagos-total">total</span>
        </span>
      </div>

      <div id='pagos-botones'>
        <button className="boton-filtro" onClick={() => setFiltrovis(!filtrovis)}>
          <MdFilterListAlt style={styleIcons} />
        </button>
        <button id="boton-add" onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setModalAdd(true);
        }}>
          +
        </button>
      </div>
    </div>
  );
};

export default Acciones;