import './index.css';
import { numberToCurrency } from '../../helpers/general';

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
  );
};

export default PagoCard;