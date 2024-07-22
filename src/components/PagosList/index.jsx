import './index.css';
import FilaPagoSmall from '@components/FilaPagoSmall';
import { Each } from '@/Each';

const PagosList = ({ pagos, actualPage, showModalDel, showModalUpd }) => {
  if (!pagos) return null;

  const sortedPagos = pagos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return(
    <div className='contenedor-small-size'>
      <Each of={sortedPagos} render={(item, index) => (
        (index >= (actualPage*20 - 20)) &&
        (index < actualPage*20) &&
        <FilaPagoSmall
          pago={item}
          key={item._id}
          showModalDel={showModalDel}
          showModalUpd={showModalUpd}
        />
      )}
      />
    </div>
  );
};

export default PagosList;