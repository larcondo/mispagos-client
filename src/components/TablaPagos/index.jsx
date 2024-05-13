import './index.css';
import FilaPago from '../FilaPago';
import { Each } from '../../Each';

const TablaPagos = ({ pagos, actualPage, showModalDel, showModalUpd }) => {

  if (!pagos || pagos.length < 1) return null;

  const sortedPagos = pagos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return(
    <div id='contenedor-tabla'>
      <table id='tabla-pagos'>
        <tbody>
          <tr>
            <th className="col-tipo">Tipo</th>
            <th className="col-fecha">Fecha</th>
            <th className="col-venc">Vencimiento</th>
            <th className="col-detalle">Detalle</th>
            <th className="col-importe">Importe</th>
            <th className="col-obs">Observaciones</th>
            <th className="col-acciones">Acciones</th>
          </tr>

          <Each of={sortedPagos} render={(item, index) => (
            (index >= (actualPage*20 - 20)) &&
            (index < (actualPage*20)) &&
            <FilaPago key={item._id} pago={item} showModalDel={showModalDel} showModalUpd={showModalUpd} />
          )}
          />
        </tbody>
      </table>
    </div>
  );
};

export default TablaPagos;