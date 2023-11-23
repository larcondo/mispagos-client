// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// ChartJS.register(ArcElement, Tooltip, Legend)
import '../../css/Graficas.css'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../contexts/userDetails';
import GraficoBar from '../../components/GraficoBar';
import GraficoPie from '../../components/GraficoPie';
import { opMonth, baseUrl } from '../../helpers/constants';
import { getDiferentesAnios, getDiferentesDetalles } from '../../helpers/graficos';
import axios from 'axios';

axios.defaults.withCredentials = true

function Graficas() {
  const { userinfo } = useContext(UserContext)
  const [isloading, setIsloading] = useState(true)
  const [pagos, setPagos] = useState([])
  const [barData, setBarData] = useState(null)
  const [pieData, setPieData] = useState(null)
  
  const [opdetalles, setOpdetalles] = useState([])
  const [opyear, setOpyear] = useState([])
  const [pieYear, setPieYear] = useState('2023')
  const [pieMonth, setPieMonth] = useState('01')
  const [activeBar, setActiveBar] = useState('')
  const [dataError, setDataError] = useState({ error: null, message: null })

  useEffect(() => {
    getPagos()
  }, [])

  const getPagos = () => {
    
    setIsloading(true)
    const getHeader = {'Authorization': `Bearer ${userinfo.token}`}
    axios.get(`${baseUrl}/pagos`, { headers: getHeader })
    .then(res => {
      setPagos(res.data.resultado)

      const pagosTipoPago = res.data.resultado.filter( pago => pago.tipo === 'pago')
      setOpyear( getDiferentesAnios(pagosTipoPago) )
      setOpdetalles( getDiferentesDetalles(pagosTipoPago) )
      
      initBar(pagosTipoPago)
      initPie(pagosTipoPago)
      
      setDataError({ error: false, message: null })

    })
    .catch(err => {
      console.log(err)
      setDataError({ error: true, message: err.response.statusText })
    })
    .finally(() => {
      // setTimeout(() => setIsloading(false), 2000)
      setIsloading(false)
    })
  }

  const initBar = ( initialData ) => {
    const aux = initialData.sort( (a,b) => a.detalle.localeCompare(b.detalle) )
    // const data = initialData.filter( pago => pago.detalle === initialData[0].detalle)
    const data = initialData.filter( pago => pago.detalle === aux[0].detalle)

    setActiveBar(data[0].detalle)
    data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    const ex = data.map( pago => pago.fecha )
    const ey = data.map( pago => pago.importe )

    setBarData({
      labels: ex,
      datasets: [{ 
        data: ey,
        label: data[0].detalle,
        backgroundColor: 'hsl(240, 38%, 40%)',
        barPercentage: 0.5,   // default 0.9
      }]
    })
  }

  const refreshBar = ( detalle ) => {
    setActiveBar(detalle)
    const data = pagos.filter( pago => pago.detalle === detalle )

    const dataSorted = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    const ex = dataSorted.map( pago => pago.fecha )
    const ey = dataSorted.map( pago => pago.importe )

    setBarData({
      labels: ex,
      datasets: [{ 
        data: ey,
        label: detalle,
        backgroundColor: 'hsl(240, 38%, 50%)'
      }]
    })
  }
  
  const initPie = ( initialData ) => {
    
    const data = initialData.filter( pago => pago.fecha.substring(0,7) === `${pieYear}-${pieMonth}` )
    data.sort( (a, b) => a.importe - b.importe)

    let pieColors = []
    let i;
    for(i = 0; i < data.length; i++) {
      pieColors.push('hsl(240, 38%, ' + ((i+1) / (data.length+1))*100 + '%)')
    }
    
    setPieData({
      labels: data.map( p => p.detalle ),
      datasets: [{
        label: 'Importe',
        data: data.map( p => p.importe),
        backgroundColor: pieColors,
        borderWidth: 0,
        borderColor: 'black'
      }]
    })
    // console.log('Init Pie')
  }
  
  /* NOTA: 
    La actualización del gráfico Pie se realiza de esta manera y no con el hook 'useEffect' ya que
    se nota un bug al querer actualizar el gráfico con mes-año sin pagos (datos).
  */
  const refreshPie = ( yearMonth ) => {
    
    const datos = pagos.filter( pago => pago.fecha.substring(0,7) === yearMonth && pago.tipo === 'pago')

    datos.sort( (a, b) => a.importe - b.importe)

    let pieColors = []
    let i;
    for(i = 0; i < datos.length; i++) {
      pieColors.push('hsl(240, 38%, ' + ((i+1) / (datos.length+1))*100 + '%)')
    }

    setPieData({
      labels: datos.map( p => p.detalle ),
      datasets: [{
        lable: 'Pie',
        data: datos.map( p => p.importe),
        backgroundColor: pieColors,
        borderWidth: 0,
        borderColor: 'black'
      }]
    })
  }

  // Cambio selección Año (Year) - Pie Chart
  const changeYear = ( value ) => {
    setPieYear(value)
    const cadena = `${value}-${pieMonth}`
    refreshPie(cadena)
  }
  
  // Cambio selección Mes (Month) - Pie Chart
  const changeMonth = ( value ) => {
    setPieMonth(value)
    const cadena = `${pieYear}-${value}`
    refreshPie(cadena)
  }

  return(
    <>
      { isloading && <span className="loader-pagos"></span> }

      { !isloading && 
      <>
      <h1 className="titulo">Gráficas</h1>

      <div style={{display: dataError.error ? 'block': 'none'}}>
        <p style={{textAlign: 'center'}}>Lo sentimos, no podemos obtener los datos de los pagos en este momento.</p>
        <p style={{textAlign: 'center'}}>Inténtalo de nuevo más tarde.</p>
        <br />
        <p style={{textAlign: 'center'}}>Error: { dataError.message }</p>
      </div>

      <div style={{display: dataError.error ? 'none': 'block'}}>
        
        <h2 className="chart-title2">Distribución de Pagos por Detalle</h2>
        
        <div className="chart-bar-botones">
          { opdetalles && opdetalles.map( (opcion, index) => {
            return <button key={index} className={`chart-bar-boton ${ activeBar === opcion ? 'active' : '' }`} onClick={() => refreshBar(opcion)}>{ opcion }</button>
          })}
        </div>
        
        <div className="chart-bar-container">
          { barData && <GraficoBar data={barData} /> }
        </div>
        
        <h2 className="chart-title2">Distribución de Pagos por mes [%]</h2>

        <div className="chart-pie-container">
          <div className="chart-pie-options">
            <label htmlFor="pie-year"><span>Año:</span>
              <select name="pie-year" id="pie-year" value={pieYear} onChange={(e) => { changeYear(e.target.value)}}>
                { opyear && opyear.map( (op, index) => {
                  return <option value={op} key={index}>{ op }</option>
                })}
              </select>
            </label>
            <label htmlFor="pie-month"><span>Mes:</span>
              <select name="pie-month" id="pie-month" value={pieMonth} onChange={(e) => { changeMonth(e.target.value) }}>
                { opMonth && opMonth.map( op => {
                  return <option value={op.value} key={op.id}>{ op.text }</option>
                })}
              </select>
            </label>
          </div>
          
          { pieData && <GraficoPie data={pieData} /> }
        
        </div>

      </div>
      </> }
    </>
  );
}

export default Graficas