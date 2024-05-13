import './index.css'
import { monthToText } from '../../helpers/general'
import ChartPieSelect from '../ChartPieSelect'

const ChartPieOptions = ({ year, month, onChangeYear, onChangeMonth, yearOptions, monthOptions }) => {
  if (!yearOptions) return null

  return(
    <div className='chart-pie-options'>
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

export default ChartPieOptions