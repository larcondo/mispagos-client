// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// ChartJS.register(ArcElement, Tooltip, Legend)
import '../../css/Graficas.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import GraficoBar from '../../components/GraficoBar';
import GraficoPie from '../../components/GraficoPie';
import { Each } from '../../Each';
import { monthToText } from '../../helpers/general';

function Graficas() {
  const [isloading, setIsloading] = useState(true)
  const pagos = useSelector(state => state.pagos.resultado)
  const optionsRedux = useSelector(state => state.pagos.options)
  const [barData, setBarData] = useState(null)
  const [pieData, setPieData] = useState(null)
  
  const [pieYear, setPieYear] = useState('2023')
  const [pieMonth, setPieMonth] = useState('01')
  const [activeBar, setActiveBar] = useState('')
  const [dataError, setDataError] = useState({ error: null, message: null })

  useEffect(() => {
    getPagos()
  }, [])

  const getPagos = () => {
    setIsloading(true)

    try {
      const pagosTipoPago = pagos.filter( pago => pago.tipo === 'pago')
      initBar(pagosTipoPago)
      initPie(pagosTipoPago)
      setDataError({ error: false, message: null })
    } catch(e) {
      console.log(e)
      setDataError({ error: true, message: e.message })
    }

    setIsloading(false)
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
        <section>
          <h2 className="chart-title2">Distribución de Pagos por Detalle</h2>
          <ChartBarButtons options={optionsRedux.detalles} activeOption={activeBar} onClick={refreshBar} />
          <GraficoBar data={barData} />
        </section>
        
        <section>
          <h2 className="chart-title2">Distribución de Pagos por mes [%]</h2>
          <div className="chart-pie-container">
            <ChartPieOptions
              year={pieYear}
              yearOptions={optionsRedux.years}
              month={pieMonth}
              monthOptions={optionsRedux.months}
              onChangeYear={changeYear}
              onChangeMonth={changeMonth}
            />
            <GraficoPie data={pieData} />
          </div>
        </section>

      </div>
      </> }
    </>
  );
}

const ChartBarButtons = ({ options, activeOption, onClick }) => {
  if (!options) return null

  return(
    <div className="chart-bar-botones">
      <Each of={options} render={(item, index) => (
          <button key={index} onClick={() => onClick(item)}
            className={`chart-bar-boton ${ activeOption === item ? 'active' : '' }`}
          >
            { item }
          </button>
        )}
      />
    </div>
  )
}

const ChartPieOptions = ({ year, month, onChangeYear, onChangeMonth, yearOptions, monthOptions }) => {
  if (!yearOptions) return null

  return(
    <div className="chart-pie-options">
      <ChartPieSelect 
        name='pie-year' label='Año:'
        value={year} onChange={onChangeYear}
        options={yearOptions}
      />
      <ChartPieSelect 
        name='pie-month' label='Mes:'
        value={month} onChange={onChangeMonth}
        options={monthOptions}
        modifier={monthToText}
      />
    </div>
  )
}

const ChartPieSelect = ({ name, label, value, onChange, options, modifier }) => {
  return(
    <>
      <label htmlFor={name}><span>{ label }</span>
        <select name={name} id={name} value={value} onChange={(e) => { onChange(e.target.value) }}>
          <Each of={options} render={(item, index) => (
            <option value={item} key={index}>{ modifier ? modifier(item) : item }</option>
          )} />
        </select>
      </label>
    </>
  )
}

export default Graficas