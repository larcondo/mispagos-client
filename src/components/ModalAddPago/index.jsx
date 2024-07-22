import '@css/components/Modals.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPago } from '@reducers/pagosReducer';

import ModalHeader from '@components/ModalHeader';
import ModalInput from '@components/ModalInput';
import ModalSelect from '@components/ModalSelect';

function ModalAddPago({ userinfo, visible, setVisible }) {
  const initialDate = new Date().toISOString().substring(0,10);
  const dispatch = useDispatch();
  const [tipo, setTipo] = useState('');
  const [fecha, setFecha] = useState(initialDate);
  const [detalle, setDetalle] = useState('');
  const [importe, setImporte] = useState(0);
  const [vencimiento, setVencimiento] = useState(initialDate);
  const [observaciones, setObservaciones] = useState('');

  const add = () => {
    const newPago = {
      tipo, fecha, detalle, importe,
      vencimiento, observaciones, username: userinfo.name
    };

    dispatch(createPago(newPago));

    setVisible(false);
    borrarCampos();
  };

  const borrarCampos = () => {
    setTipo('');
    setFecha(initialDate);
    setDetalle('');
    setImporte(0);
    setVencimiento(initialDate);
    setObservaciones('');
  };

  return(
    <>
      { visible && <div className="modal">
        <ModalHeader
          title='AGREGAR PAGO'
          subtitle='Complete los campos del nuevo pago:'
        />

        <ModalSelect label='Tipo:' name='pago-tipo'
          value={tipo} onChange={e => setTipo(e.target.value)}
        />

        <ModalInput type='date' label='Fecha:' name='pago-fecha'
          value={fecha} onChange={e => setFecha(e.target.value)}
        />

        <ModalInput type='text' label='Detalle:' name='pago-detalle'
          value={detalle} onChange={e => setDetalle(e.target.value)}
        />

        <ModalInput type='number' label='Importe:' name='pago-importe'
          value={importe} onChange={e => setImporte(parseFloat(e.target.value))}
        />

        <ModalInput type='date' label='Vencimiento:' name='pago-vencimiento'
          value={vencimiento} onChange={e => setVencimiento(e.target.value)}
        />

        <ModalInput type='text' label='Observaciones:' name='pago-observaciones'
          value={observaciones} onChange={e => setObservaciones(e.target.value)}
        />

        <div className="modal-botones">
          <button className="boton" onClick={() => {
            setVisible(false);
            borrarCampos();
          }}>
            Cancelar
          </button>
          <button className="boton" onClick={borrarCampos}>Borrar</button>
          <button className="boton" onClick={add}>Agregar</button>
        </div>

      </div> }
    </>
  );
}

export default ModalAddPago;