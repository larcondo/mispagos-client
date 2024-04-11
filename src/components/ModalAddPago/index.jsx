import '../../css/components/Modals.css'
import { useState } from 'react'
import pagosService from '../../services/pagos'

import ModalHeader from '../ModalHeader'
import ModalInput from '../ModalInput'
import ModalSelect from '../ModalSelect'

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

  const tipoChange = (e) => setNuevopago( prev => ({...prev, tipo: e.target.value}) )
  const fechaChange = (e) => setNuevopago( prev => ({...prev, fecha: e.target.value}) )
  const detalleChange = (e) => setNuevopago( prev => ({...prev, detalle: e.target.value}) )
  const importeChange = (e) => setNuevopago( prev => ({...prev, importe: parseFloat(e.target.value)}) )
  const vencimientoChange = (e) => setNuevopago( prev => ({...prev, vencimiento: e.target.value}) )
  const observacionesChange = (e) => setNuevopago( prev => ({...prev, observaciones: e.target.value}) )

  return(
    <>
      { visible && <div className="modal">
        <ModalHeader
          title='AGREGAR PAGO'
          subtitle='Complete los campos del nuevo pago:'
        />
        
        <ModalSelect label='Tipo:' name='pago-tipo'
          value={nuevopago.tipo} onChange={tipoChange}
        />

        <ModalInput type='date' label='Fecha:' name='pago-fecha'
          value={nuevopago.fecha} onChange={fechaChange}
        />

        <ModalInput type='text' label='Detalle:' name='pago-detalle'
          value={nuevopago.detalle} onChange={detalleChange}
        />

        <ModalInput type='number' label='Importe:' name='pago-importe'
          value={nuevopago.importe} onChange={importeChange}
        />

        <ModalInput type='date' label='Vencimiento:' name='pago-vencimiento'
          value={nuevopago.vencimiento} onChange={vencimientoChange}
        />

        <ModalInput type='text' label='Observaciones:' name='pago-observaciones'
          value={nuevopago.observaciones} onChange={observacionesChange}
        />

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