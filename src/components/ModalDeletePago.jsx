import pagosService from '../services/pagos'
import { numberToCurrency } from '../helpers/general'

function ModalDeletePago({ token, infodel, visible, setVisible, afterDelete }) {

  const remove = () => {
    pagosService.remove(infodel._id, token)
    .then( response => {
      if (response.status === 200) {
        setVisible(false)
        afterDelete(response.data.deleted)   // refresco los pagos
      }

      if (response.status === 203) {
        console.log('No content')
      }
    })
    .catch( err => console.log(err))
  }

  return(
    <>
      { visible && <div className="modal">
        <div className="modal-header">
          <p>¿Desea eliminar el siguiente pago?</p>
        </div>
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
  )
}

export default ModalDeletePago;