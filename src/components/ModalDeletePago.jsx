import pagosService from '../services/pagos'
import { numberToCurrency } from '../helpers/general'

function ModalDeletePago(props) {

  const deletePago = () => {
    pagosService.remove(props.infodel._id, props.token)
    .then( response => {
      if (response.status === 200) {
        props.setVisible(false)
        props.refreshFn()   // refresco los pagos
      }
    })
    .catch( err => console.log(err))
  }

  return(
    <>
      { props.visible && <div className="modal">
        <div className="modal-header">
          <p>¿Desea eliminar el siguiente pago?</p>
        </div>
        <table className="modal-table">
          <tbody>
            <tr>
              <td>Tipo:</td>
              <td>{ props.infodel.tipo }</td>
            </tr>
            <tr>
              <td>Fecha:</td><td>{ props.infodel.fecha }</td>
            </tr>
            <tr>
              <td>Detalle:</td>
              <td>{ props.infodel.detalle }</td>
            </tr>
            <tr>
              <td>Importe:</td>
              <td>{ props.infodel.importe && numberToCurrency(props.infodel.importe) }</td>
            </tr>
            <tr>
              <td>Vencimiento:</td>
              <td>{ props.infodel.vencimiento }</td>
            </tr>
            <tr>
              <td>Observaciones:</td>
              <td title={ props.infodel.observaciones }>{ props.infodel.observaciones }</td>
            </tr>
          </tbody>
        </table>
        <div className="modal-botones">
          <button className="boton" onClick={() => props.setVisible(false)}>Cancelar</button>
          <button className="boton" onClick={() => deletePago()}>Eliminar</button>
        </div>
      </div> }
    </>
  )
}

export default ModalDeletePago;