import '../../css/Pagos.css';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/userDetails';

import ModalAddPago from '../../components/ModalAddPago';
import ModalUpdatePago from '../../components/ModalUpdatePago';
import ModalDeletePago from '../../components/ModalDeletePago';
import Acciones from '../../components/Acciones';
import Filtros from '../../components/Filtros';
import PageSelector from '../../components/PageSelector';
import TablaPagos from '../../components/TablaPagos';
import PagosList from '../../components/PagosList'

import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

function Pagos() {
  const { userinfo } = useContext(UserContext)
  const selectPagos = state => state.pagos
  const selectFilter = state => state.filter

  const pagosSel = createSelector([selectPagos, selectFilter], (pagos, filter) => {
    if (!pagos.resultado) return pagos
    return {
      ...pagos,
      resultado: pagos.resultado.filter(p => {
        return (p.tipo === filter.tipo || filter.tipo === 'Todos') &&
          (p.detalle === filter.detalle || filter.detalle === 'Todos') &&
          (p.fecha.substring(0,4) === filter.year || filter.year === 'Todos') &&
          (p.fecha.substring(5,7) === filter.month || filter.month === 'Todos') &&
          (p.observaciones.includes(filter.obs) || filter.obs === '')
      })}
  })

  const pagos = useSelector(state => pagosSel(state))

  const [isloading, setIsloading] = useState(true)
  const [modalAdd, setModalAdd] = useState(false)
  const [modalDel, setModalDel] = useState(false)
  const [modalUpd, setModalUpd] = useState(false)
  const [infodel, setInfodel] = useState({})
  const [infoupd, setInfoupd] = useState(null)
  const [filtrovis, setFiltrovis] = useState(false)
  const [actualPage, setActualPage] = useState(1)

  useEffect(() => {
    if (pagos) {
      setTimeout(() => {
        setIsloading(false)
      }, 500);
    }
  }, [])

  function showModalDel ( info ) {
    setInfodel(info)
    setModalDel(true)
  }

  function showModalUpd ( id ) {
    setInfoupd(id)
    setModalUpd(true)
  }

  const hideModalUpd = () => setModalUpd(false)

  const pages = pagos.resultado
    ? Math.floor(pagos.resultado.length / 20) + (((pagos.resultado.length % 20) > 0) ? 1 : 0)
    : 0

  return(
    <>
      { isloading && <span className="loader-pagos"></span> }

      { !isloading && <>
      <h1 className='titulo'>Pagos</h1>

      <Acciones
        pagos={pagos.resultado ? pagos.resultado : []}
        setModalAdd={setModalAdd}
        filtrovis={filtrovis}
        setFiltrovis={setFiltrovis}
      />
      
      <Filtros options={pagos.options} filtrovis={filtrovis} />

      <PageSelector pages={pages} actualPage={actualPage}
        onReClick={() => setActualPage(actualPage - 1)}
        onAvClick={() => setActualPage(actualPage + 1)}
      />
      
      <TablaPagos
        pagos={pagos.resultado}
        actualPage={actualPage}
        showModalDel={showModalDel}
        showModalUpd={showModalUpd}
      />

      <PagosList
        pagos={pagos.resultado}
        actualPage={actualPage}
        showModalDel={showModalDel}
        showModalUpd={showModalUpd}
      />
    </> }

      {/* Modal add */}
      <ModalAddPago 
        visible={modalAdd} 
        setVisible={setModalAdd}
        userinfo={userinfo}
      />

      {/* Modal update */}
      { modalUpd &&
        <ModalUpdatePago 
          setVisible={hideModalUpd} 
          idToUpdate={infoupd}
          username={userinfo.name}
          token={userinfo.token}
        />
      }

      {/* Modal delete */}
      <ModalDeletePago 
        visible={modalDel} 
        setVisible={setModalDel} 
        infodel={infodel}
        token={userinfo.token}
      />

    </>
  );
}

export default Pagos