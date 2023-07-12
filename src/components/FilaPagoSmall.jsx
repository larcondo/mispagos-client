import { useState } from "react";
import { numberToCurrency } from "../helpers/general";
import { MdDelete, MdEditSquare } from 'react-icons/md';
import '../css/components/FilaPagoSmall.css'

function FilaPagoSmall({ pago, showModalDel, showModalUpd }) {
  const [vis, setVis] = useState(false)

  const iconStyle = { position: 'relative', top: '2px', fontSize: '1em' }

  return(
    <div className="fila-small">
      <span className="fila-small-block0">
        {/* <button onClick={() => setVis(!vis)}>{ (vis) ? <span>&and;</span> : <span>&or;</span> }</button> */}
        <button onClick={() => setVis(!vis)}>
          { (vis) ? <span>&#9651;</span> : <span>&#9661;</span> }
        </button>
      </span>
      <span className="fila-small-block1">
        <p className="fila-small-block1-title">{pago.tipo}</p>
        <p className="fila-small-block1-value">{pago.fecha}</p>
      </span>
      <span className="fila-small-block2">
        <p className="fila-small-block2-title">{pago.detalle}</p>
        <p className="fila-small-block2-value">{numberToCurrency(pago.importe)}</p>
      </span>
      <span className="fila-small-block3">
        <span>
          <button className="boton-tabla boton-delete" onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showModalDel(pago)
          }}>
            <MdDelete style={iconStyle} />
          </button>
        </span>
        <span>
          <button className="boton-tabla boton-update" onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showModalUpd(pago)
          }}>
            <MdEditSquare style={iconStyle} />
          </button>
        </span>
      </span>
      <span className="fila-small-block4" style={{ display: (vis) ? 'block': 'none' }}>
        <p className="fila-small-block4-title">Vencimiento</p>
        <p className="fila-small-block4-value">{pago.vencimiento}</p>
      </span>
      <span className="fila-small-block5" style={{ display: (vis) ? 'block': 'none' }}>
        <p className="fila-small-block5-title">Observacion</p>
        <p className="fila-small-block5-value">{pago.observaciones}</p>
      </span>
    </div>
  );
}

export default FilaPagoSmall