import './index.css'
import PagoCard from '../PagoCard'

const SummaryLastEight = ({ pagos }) => {
  if (!pagos || pagos.length < 1) return <p>No se encontraron pagos.</p>

  return(
    <div className='ultimos-pagos'>
      { pagos.map( p => <PagoCard pago={p} key={p._id} /> ) }
    </div>
  )
}

export default SummaryLastEight