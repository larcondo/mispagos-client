import '../../css/components/Modals.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { modifyPago } from '../../reducers/pagosReducer';

import ModalHeader from '../ModalHeader';
import ModalInput from '../ModalInput';
import ModalSelect from '../ModalSelect';

function ModalUpdatePago({ idToUpdate, setVisible }) {
  const dispatch = useDispatch();
  const updateSelector = createSelector([state => state.pagos], (pagos) => {
    return pagos.resultado.filter(p => p._id === idToUpdate)[0];
  });
  const pagoToUpdate = useSelector(state => updateSelector(state));

  const [tipo, setTipo] = useState(pagoToUpdate.tipo);
  const [fecha, setFecha] = useState(pagoToUpdate.fecha);
  const [detalle, setDetalles] = useState(pagoToUpdate.detalle);
  const [importe, setImporte] = useState(pagoToUpdate.importe);
  const [vencimiento, setVencimiento] = useState(pagoToUpdate.vencimiento);
  const [observaciones, setObservaciones] = useState(pagoToUpdate.observaciones);

  if(!idToUpdate) return null;

  const update = () => {
    const toUpdate = { tipo, fecha, detalle, importe, vencimiento, observaciones };
    dispatch(modifyPago(idToUpdate, toUpdate));
    setVisible(false);
  };

  return(
    <div className="modal">
      <ModalHeader
        title='ACTUALIZAR PAGO'
        subtitle='Modifique los campos que desea actualizar'
      />

      <ModalSelect name='update-tipo' label='Tipo:'
        value={tipo}
        onChange={e => setTipo(e.target.value)}
      />

      <ModalInput type='date' name='update-fecha' label='Fecha;'
        value={fecha}
        onChange={e => setFecha(e.target.value)}
      />

      <ModalInput type='text' name='update-detalle' label='Detalle:'
        value={detalle}
        onChange={e => setDetalles(e.target.value)}
      />

      <ModalInput type='number' name='update-importe' label='Importe:'
        value={importe}
        onChange={e => setImporte(e.target.value)}
      />

      <ModalInput type='date' name='update-vencimiento' label='Vencimiento:'
        value={vencimiento}
        onChange={e => setVencimiento(e.target.value)}
      />

      <ModalInput type='text' name='update-observaciones' label='Observaciones:'
        value={observaciones}
        onChange={e => setObservaciones(e.target.value)}
      />

      <div className="modal-botones">
        <button className="boton" onClick={setVisible}>Cancelar</button>
        <button className="boton" onClick={() => update()}>Actualizar</button>
      </div>
    </div>
  );
}

export default ModalUpdatePago;