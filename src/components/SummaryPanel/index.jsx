import './index.css';
import SummaryValue from './SummaryValue';

const SummaryPanel = ({ values }) => {
  if (!values) return <div className='summary-not-found'>No se encontraron pagos del mes actual.</div>;

  return(
    <>
      <h3 style={{ marginTop: '1em' }}>Resumen del mes: { values.monthName }</h3>
      <div className='summary-panel'>
        <SummaryValue label='Minimo' value={values.min} />
        <SummaryValue label='Maximo' value={values.max} />
        <SummaryValue label='Promedio' value={values.average} />
        <SummaryValue label='Total' value={values.total} />
      </div>
    </>
  );
};

export default SummaryPanel;