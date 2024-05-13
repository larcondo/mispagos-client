import '../../css/components/Modals.css';
import { numberToCurrency } from '../../helpers/general';
import { useDispatch } from 'react-redux';
import { removePago } from '../../reducers/pagosReducer';

import ModalHeader from '../ModalHeader';

function ModalDeletePago({ token, infodel, visible, setVisible }) {
  const dispatch = useDispatch();

  const remove = () => {
    const id = infodel._id;
    dispatch(removePago(id, token));
    setVisible(false);
  };

  return(
    <>
      { visible && <div className="modal">

        <ModalHeader title='¿Desea eliminar el siguiente pago?' />

        <table className="modal-table">
          <tbody>
            <tr>
              <td>Tipo:</td>
              <td>{ infodel.tipo }</td>
            </tr>
            <tr>
              <td>Fecha:</td><td>{ infodel.fecha }</td>
            </tr>
            <tr>
              <td>Detalle:</td>
              <td>{ infodel.detalle }</td>
            </tr>
            <tr>
              <td>Importe:</td>
              <td>{ infodel.importe && numberToCurrency(infodel.importe) }</td>
            </tr>
            <tr>
              <td>Vencimiento:</td>
              <td>{ infodel.vencimiento }</td>
            </tr>
            <tr>
              <td>Observaciones:</td>
              <td title={ infodel.observaciones }>{ infodel.observaciones }</td>
            </tr>
          </tbody>
        </table>
        <div className="modal-botones">
          <button className="boton" onClick={() => setVisible(false)}>Cancelar</button>
          <button className="boton" onClick={() => remove()}>Eliminar</button>
        </div>
      </div> }
    </>
  );
}

export default ModalDeletePago;