import '../../css/Inicio.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/userDetails'
import pagosService from '../../services/pagos'

import SummaryPanel from '../../components/SummaryPanel'
import PagoCard from '../../components/PagoCard'

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

  useEffect(initData)

  if (isloading) return <span className='loader-pagos'></span>

  return(
    <div className='contenedor-inicio'>
      <h1>Hola, { userinfo.firstName }!</h1>

      <section>
        <SummaryPanel values={data.values} />
      </section>

      <section style={{ margin: '1em 0'}}>
        <h3 style={{margin: '1em 0'}}>Últimos pagos realizados</h3>
        {
          data.lastEight.length < 1
            ? <p>No se encontraron pagos.</p>
            : <div className='ultimos-pagos'>
                { data.lastEight.map( p => <PagoCard pago={p} key={p._id} />)}
              </div>
        }
      </section>
    </div>
  );
}

export default Inicio