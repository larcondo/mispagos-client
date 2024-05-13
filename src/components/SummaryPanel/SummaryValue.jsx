import { numberToCurrency } from '../../helpers/general';

const SummaryValue = ({ value, label }) => {
  if (!value) return null;
  return(
    <div className='summary-value'>
      <p>{ numberToCurrency(value) }</p>
      <p>{label}</p>
    </div>
  );
};

export default SummaryValue;