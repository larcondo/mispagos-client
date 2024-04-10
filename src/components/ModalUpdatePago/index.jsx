import '../../css/components/Modals.css'
import { useState, useEffect } from 'react'
import pagosService from '../../services/pagos'

function ModalUpdatePago({ token, infoupd, visible, setVisible, afterUpdate }) {
  const [nuevopago, setNuevopago] = useState({ tipo: '', fecha: '', detalle: '', importe: 0, vencimiento: '', observaciones: '' })
  // const [mostrar, setMostrar] = useState(false)
  
  useEffect(()=> {
    setNuevopago({
      tipo: infoupd.tipo ? infoupd.tipo : '',
      fecha: infoupd.fecha ? infoupd.fecha : '',
      detalle: infoupd.detalle ? infoupd.detalle : '',
      importe: infoupd.importe ? infoupd.importe : 0,
      vencimiento: infoupd.vencimiento ? infoupd.vencimiento : '',
      observaciones: infoupd.observaciones ? infoupd.observaciones : '',
    })
    // setMostrar(visible ? visible : false)
  }, [visible])

  const update = () => {
    pagosService.update(infoupd._id, nuevopago, token)
    .then( response => {
      if (response.status === 200) {
        setVisible(false)
        afterUpdate(response.data.updated)
      } else {
        alert('Status distinto a 200')
      }
    })
    .catch( err => {
      console.log(err)
      alert('Hubo un error al actualizar')
    })
  }

  return(
    <>
      { visible && <div className="modal">
        <div className="modal-header">
          <p>ACTUALIZAR PAGO</p>
          <p style={{fontSize: '0.8em'}}>Modifique los campos que desea actualizar</p>
        </div>

        <div className="recuadro-input">
          <label htmlFor="update-tipo">Tipo:</label>
          <select name="update-tipo" id="update-tipo" className="modal-input" 
            value={nuevopago.tipo} onChange={ e => setNuevopago( prevState => ({...prevState, tipo: e.target.value}) )}>
            <option value=""></option>
            <option value="pago">Pago</option>
            <option value="divisas">Divisas</option>
          </select>
        </div>

        <div className="recuadro-input">
          <label htmlFor="update-fecha">Fecha:</label>
          <input type="date" name="update-fecha" id="update-fecha" className="modal-input" 
            value={nuevopago.fecha} onChange={ e => setNuevopago( prevState => ({...prevState, fecha: e.target.value}) )} />
        </div>

        <div className="recuadro-input">
          <label htmlFor="update-detalle">Detalle:</label>
          <input type="text" name="update-detalle" id="update-detalle" className="modal-input" 
            value={nuevopago.detalle} onChange={ e => setNuevopago( prevState => ({...prevState, detalle: e.target.value}) )} />
        </div>

        <div className="recuadro-input">
          <label htmlFor="update-importe">Importe:</label>
          <input type="number" name="update-importe" id="update-importe" className="modal-input" step={0.01} 
            value={nuevopago.importe} onChange={ e => setNuevopago( prevState => ({...prevState, importe: e.target.value}) )} />
        </div>

        <div className="recuadro-input">
          <label htmlFor="update-vencimiento">Vencimiento:</label>
          <input type="date" name="update-vencimiento" id="update-vencimiento" className="modal-input" 
            value={nuevopago.vencimiento} onChange={e => setNuevopago( prevState => ({...prevState, vencimiento: e.target.value}) )} />
        </div>
        
        <div className="recuadro-input">
          <label htmlFor="update-observaciones">Observaciones:</label>
          <input type="text" name="update-observaciones" id="update-observaciones" className="modal-input" 
            value={nuevopago.observaciones} onChange={e => setNuevopago( prevState => ({...prevState, observaciones: e.target.value}) )} />
        </div>

        <div className="modal-botones">
          <button className="boton" onClick={() => setVisible(false)}>Cancelar</button>
          <button className="boton" onClick={() => update()}>Actualizar</button>
        </div>
      </div> }
    </>
  );
}

export default ModalUpdatePago