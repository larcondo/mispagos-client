import '../../css/Inicio.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/userDetails';
import { useDispatch, useSelector } from 'react-redux';
import { initializePagos } from '../../reducers/pagosReducer';
import { summaryChange } from '../../reducers/summaryReducer';

import SummaryPanel from '../../components/SummaryPanel';
import SummaryLastEight from '../../components/SummaryLastEight';

function Inicio() {
  const { userinfo } = useContext(UserContext);
  const dispatch = useDispatch();
  const summaryData = useSelector(state => state.summary);
  const [isloading, setIsloading] = useState(true);

  const initData = () => {
    const { token } = userinfo;

    dispatch(summaryChange(token));
    dispatch(initializePagos(token));

    setIsloading(false);
  };

  useEffect(initData, []);

  if (isloading) return <span className='loader-pagos'></span>;

  if(!summaryData) return null;

  return(
    <div className='contenedor-inicio'>
      <h1>Hola, { userinfo.firstName }!</h1>

      <section>
        <SummaryPanel values={summaryData.values} />
      </section>

      <section style={{ margin: '1em 0' }}>
        <h3 style={{ margin: '1em 0' }}>Últimos pagos realizados</h3>
        <SummaryLastEight pagos={summaryData.lastEight} />
      </section>
    </div>
  );
}

export default Inicio;