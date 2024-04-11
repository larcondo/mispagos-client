import '../../css/components/Modals.css'
import { useState, useEffect } from 'react'
import pagosService from '../../services/pagos'

import ModalHeader from '../ModalHeader'
import ModalInput from '../ModalInput'
import ModalSelect from '../ModalSelect'

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
  }, [visible, infoupd])

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
        <ModalHeader
          title='ACTUALIZAR PAGO'
          subtitle='Modifique los campos que desea actualizar'
        />

        <ModalSelect name='update-tipo' label='Tipo:'
          value={nuevopago.tipo}
          onChange={ e => setNuevopago( prevState => ({...prevState, tipo: e.target.value}) )}
        />

        <ModalInput type='date' name='update-fecha' label='Fecha;'
          value={nuevopago.fecha}
          onChange={e => setNuevopago( prevState => ({...prevState, fecha: e.target.value}) )}
        />

        <ModalInput type='text' name='update-detalle' label='Detalle:'
          value={nuevopago.detalle}
          onChange={e => setNuevopago( prevState => ({...prevState, detalle: e.target.value}) )}
        />

        <ModalInput type='number' name='update-importe' label='Importe:'
          value={nuevopago.importe}
          onChange={ e => setNuevopago( prevState => ({...prevState, importe: e.target.value}) )}
        />

        <ModalInput type='date' name='update-vencimiento' label='Vencimiento:'
          value={nuevopago.vencimiento}
          onChange={e => setNuevopago( prevState => ({...prevState, vencimiento: e.target.value}) )}
        />
        
        <ModalInput type='text' name='update-observaciones' label='Observaciones:'
          value={nuevopago.observaciones}
          onChange={e => setNuevopago( prevState => ({...prevState, observaciones: e.target.value}) )}
        />

        <div className="modal-botones">
          <button className="boton" onClick={() => setVisible(false)}>Cancelar</button>
          <button className="boton" onClick={() => update()}>Actualizar</button>
        </div>
      </div> }
    </>
  );
}

export default ModalUpdatePago