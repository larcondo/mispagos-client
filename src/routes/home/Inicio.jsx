import '../../css/Inicio.css'
import { numberToCurrency } from '../../helpers/general'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/userDetails';
import pagosService from '../../services/pagos';

function Inicio() {
  const { userinfo } = useContext(UserContext)
  const [isloading, setIsloading] = useState(true)
  const [data, setData] = useState(null)
  
  const initData = () => {
    pagosService
      .getSummary(userinfo.token)
      .then( res => {
        setData(res.data)
        setIsloading(false)
        // console.log(res.data)
      })
      .catch( err => console.log(err))
  }

  useEffect(initData, [])

  if (isloading) return <span className='loader-pagos'></span>

  return(
    <>
      <h1>Hola, { userinfo.firstName }!</h1>

      <section>
        <SummaryPanel values={data.values} />
      </section>

      <section style={{ margin: '1em 0'}}>
        <h2 style={{margin: '1em 0'}}>Últimos pagos realizados</h2>
        {
          data.lastEight.length < 1
            ? <p>No se encontraron pagos.</p>
            : <div className='ultimos-pagos'>
                { data.lastEight.map( p => <PagoCard pago={p} key={p._id} />)}
              </div>
        }
      </section>
    </>
  );
}

const PagoCard = ({ pago }) => {
  return(
    <div className='pago-card'>
      <p className='fecha'>
        { pago?.fecha ?? '2022-12-25'}
      </p>
      <p className='importe'>
        { numberToCurrency(pago?.importe ?? 999999.99) }
      </p>
      <p className='detalle'>
        { pago?.detalle ?? 'A Very Long Description' }
      </p>
    </div>
  )
}

const SummaryPanel = ({ values }) => {
  if (!values) return <div>No se encontraron pagos del mes actual.</div>

  return(
    <>
      <h2 style={{marginTop: '1em'}}>Resumen del mes: { values.monthName }</h2>
      <div className='summary-panel'>
        <SummaryValue label='Minimo' value={values.min} />
        <SummaryValue label='Maximo' value={values.max} />
        <SummaryValue label='Promedio' value={values.average} />
        <SummaryValue label='Total' value={values.total} />
      </div>
    </>
  )
}

const SummaryValue = ({ value, label }) => {
  if (!value) return null
  return(
    <div className='summary-value'>
      <p>{ numberToCurrency(value) }</p>
      <p>{label}</p>
    </div>
  )
}

export default Inicio