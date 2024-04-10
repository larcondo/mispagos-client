import '../../css/components/Modals.css'
import { useState } from 'react'
import pagosService from '../../services/pagos'

function ModalAddPago({ username, token, visible, setVisible, afterAdd }) {
  const [nuevopago, setNuevopago] = useState(
    {
      tipo: '',
      fecha: '',
      detalle: '',
      importe: 0,
      vencimiento: '',
      observaciones: '',
      username: username
    }
  )

  const add = () => {
    pagosService.add(nuevopago, token)
    .then( response => {
      if (response.status === 201) {
        setVisible(false)
        afterAdd(response.data.added)   // refresco los datos
        borrarCampos()
      }
    })
    .catch( err => console.log(err))
  }

  const borrarCampos = () => {

    setNuevopago({
      tipo: '',
      fecha: '',
      detalle: '',
      importe: 0,
      vencimiento: '',
      observaciones: '',
      username: username
    })

  }

  return(
    <>
      { visible && <div className="modal">
        <div className="modal-header">
          <p>AGREGAR PAGO</p>
          <p style={{fontSize: '0.8em'}}>Complete los campos del nuevo pago:</p>
        </div>

        <div className="recuadro-input">
          <label htmlFor="pago-tipo">Tipo:</label>
          <select name="pago-tipo" id="pago-tipo" className="modal-input" 
            value={nuevopago.tipo} 
            onChange={ e => setNuevopago( prev => ({...prev, tipo: e.target.value}) )} >
            <option value=""></option>
            <option value="pago">Pago</option>
            <option value="divisas">Divisas</option>
          </select>
        </div>

        <div className="recuadro-input">
          <label htmlFor="pago-fecha">Fecha:</label>
          <input type="date" 
            name="pago-fecha" 
            id="pago-fecha" 
            className="modal-input" 
            value={nuevopago.fecha}
            onChange={ e => setNuevopago( prev => ({...prev, fecha: e.target.value}) )} />
        </div>

        <div className="recuadro-input">
          <label htmlFor="pago-detalle">Detalle:</label>
          <input type="text" 
            name="pago-detalle" 
            id="pago-detalle" 
            className="modal-input"
            value={nuevopago.detalle}
            onChange={ e => setNuevopago( prev => ({...prev, detalle: e.target.value}) )} 
          />
        </div>

        <div className="recuadro-input">
          <label htmlFor="pago-importe">Importe:</label>
          <input type="number" 
            name="pago-importe" 
            id="pago-importe" 
            className="modal-input"
            value={nuevopago.importe}
            step="0.01"
            onChange={ e => setNuevopago( prev => ({...prev, importe: parseFloat(e.target.value)}) )} 
          />
        </div>

        <div className="recuadro-input">
          <label htmlFor="pago-vencimiento">Vencimiento:</label>
          <input type="date" 
            name="pago-vencimiento" 
            id="pago-vencimiento" 
            className="modal-input"
            value={nuevopago.vencimiento}
            onChange={ e => setNuevopago( prev => ({...prev, vencimiento: e.target.value}) )}
          />
        </div>

        <div className="recuadro-input">
          <label htmlFor="pago-observaciones">Observaciones:</label>
          <input type="text" 
            name="pago-observaciones" 
            id="pago-observaciones" 
            className="modal-input" 
            value={nuevopago.observaciones}
            onChange={ e => setNuevopago( prev => ({...prev, observaciones: e.target.value}) )}
          />
        </div>

        <div className="modal-botones">
          <button className="boton" onClick={() => {
            setVisible(false)
            borrarCampos()
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

export default ModalAddPago