import './index.css'
import { numberToCurrency } from '../../helpers/general';
import { MdDelete, MdEditSquare } from 'react-icons/md'

function FilaPago({ pago, showModalDel, showModalUpd }) {
  const iconStyle = { position: 'relative', top: '2px', fontSize: '1em' }
  
  return(
    <tr>
      <td className="col-tipo">{ pago.tipo }</td>
      <td className="col-fecha">{ pago.fecha }</td>
      <td className="col-venc">{ pago.vencimiento }</td>
      <td className="col-detalle">{ pago.detalle }</td>
      <td className="col-importe">{ numberToCurrency(pago.importe) }</td>
      <td className="col-obs">{ pago.observaciones }</td>
      <td className="col-acciones" style={{paddingLeft: '0', paddingRight: '0' }}>
        <button className="boton-tabla boton-delete" onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          showModalDel(pago)
        }}>
          <MdDelete style={iconStyle} />
        </button>
        <button className="boton-tabla boton-update" onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          showModalUpd(pago._id)
        }}>
          <MdEditSquare style={iconStyle} />
        </button>
      </td>
    </tr>
  );
}

export default FilaPago;