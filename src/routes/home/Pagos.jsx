import '../../css/Pagos.css';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/userDetails';
import { numberToCurrency, monthToText } from '../../helpers/general';
import FilaPago from '../../components/FilaPago';
import FilaPagoSmall from '../../components/FilaPagoSmall';
import ModalAddPago from '../../components/ModalAddPago';
import ModalUpdatePago from '../../components/ModalUpdatePago';
import ModalDeletePago from '../../components/ModalDeletePago';
import { MdFilterListAlt } from 'react-icons/md';

import pagosService from '../../services/pagos';

function Pagos() {
  const { userinfo } = useContext(UserContext)
  const [isloading, setIsloading] = useState(true)
  const [pagos, setPagos] = useState([])
  const [tableData, setTableData] = useState([])
  const [options, setOptions] = useState({})
  const [modalAdd, setModalAdd] = useState(false)
  const [modalDel, setModalDel] = useState(false)
  const [modalUpd, setModalUpd] = useState(false)
  const [infodel, setInfodel] = useState({})
  const [infoupd, setInfoupd] = useState({})
  const [filtro, setFiltro] = useState({ tipo: 'todos', detalle: 'todos', year: 'todos', month: 'todos', obs: '' })
  const [filtrovis, setFiltrovis] = useState(false)
  const [actualPage, setActualPage] = useState(1)
  const [pages, setPages] = useState(0)
  const styleIcons = {
    position: 'relative', top: '2px'
  }

  useEffect(() => {
    getPagos()
  }, [])

  // Se filtran los datos que se muestran en pantalla en funcion de los filtros activos
  useEffect(() => {  
    verificarFiltros( pagos, filtro )
    setActualPage(1)
  }, [filtro])

  useEffect(() => {
    const paginas = Math.floor(tableData.length / 20) + (((tableData.length % 20) > 0) ? 1 : 0)
    setPages(paginas)
    // console.log(`${paginas} paginas`)
  }, [tableData])

  function getPagos() {
    setIsloading(true)
    // setTimeout(() => setIsloading(false), 3000)

    pagosService.getAll(userinfo.token)
    .then(res => {
      setPagos(res.data.resultado)
      verificarFiltros(res.data.resultado, filtro)
      
      setOptions(res.data.options)
      setIsloading(false)
    })
    .catch(err => {
      console.log(err.response.statusText)
      setIsloading(false)
    })
  }

  const refreshPagos = (newPagos) => {
    setPagos(newPagos)
    verificarFiltros(newPagos, filtro)
  }

  const addPago = (added) => refreshPagos(pagos.concat(added))

  const updatePago = (updated) => {
    const newPagos = pagos
      .filter(e => e._id !== updated._id)
      .concat(updated)
    refreshPagos(newPagos)
  }

  const deletePago = (deleted) => {
    const newPagos = pagos.filter(e => e._id !== deleted._id)
    refreshPagos(newPagos)
  }

  function verificarFiltros( arrayPagos, objFiltros ) {
    let aux = []
    // Filtro por Tipo
    aux = (objFiltros.tipo.toLowerCase() === 'todos')
      ? arrayPagos.sort((a, b)=> new Date(b.fecha) - new Date(a.fecha))
      : arrayPagos.filter( e => e.tipo === objFiltros.tipo )
    // Filtro por Detalle
    aux = (objFiltros.detalle.toLowerCase() === 'todos') ? aux : aux.filter( e => e.detalle === objFiltros.detalle )
    // Filtro por Año
    aux = (objFiltros.year.toLowerCase() === 'todos') ? aux : aux.filter( e => e.fecha.substring(0,4) === objFiltros.year )
    // Filtro por Mes
    aux = (objFiltros.month.toLowerCase() === 'todos') ? aux : aux.filter( e => e.fecha.substring(5,7) === objFiltros.month )
    // Filtro por Observacion
    aux = (objFiltros.obs === '') ? aux : aux.filter( e => e.observaciones.toLowerCase().includes(objFiltros.obs.toLowerCase()))

    setTableData(aux)
  }

  function showModalDel ( info ) {
    setInfodel(info)
    setModalDel(true)
  }

  function showModalUpd ( info ) {
    setInfoupd(info)
    setModalUpd(true)
  }

  return(
    <>
      { isloading && <span className="loader-pagos"></span> }

      { !isloading && <>
      <h1 className="titulo">Pagos</h1>
      <div id="contenedor-acciones">
        <div id="pagos-info">
          <span>
            <span id="pagos-entradas-valor">{ tableData.length }</span> <span id="pagos-entradas">entradas</span>
          </span>
          <span>
            <span id="pagos-total-valor">{ numberToCurrency(tableData.reduce( (acc, val) => acc + val.importe, 0.0 )) }</span> <span id="pagos-total">total</span>
          </span>
        </div>
        <div id="pagos-botones">
          <button className="boton-filtro" onClick={() => setFiltrovis(!filtrovis)}>
            <MdFilterListAlt style={styleIcons} />
          </button>
          <button id="boton-add" onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setModalAdd(true)
          }}>
            +
          </button>
        </div>
      </div>
      
      <div id="contenedor-filtros" style={{display: filtrovis ? 'flex' : 'none'}}>
        <div className="filtro">
          <label htmlFor="select-tipo">Tipo:</label>
          <select name="select-tipo" id="select-tipo" onChange={(e) => setFiltro( prev => ({ ...prev, tipo: e.target.value}))}>
            <option value="Todos">Todos</option>
            { options.tipos && options.tipos.map( (op, index) => {
              return <option value={op} key={index}>{op}</option>
            })}
          </select>
        </div>
        <div className="filtro">
          <label htmlFor="select-detalle">Detalle:</label>
          <select name="select-detalle" id="select-detalle" onChange={(e) => setFiltro( prev => ({ ...prev, detalle: e.target.value}))}>
            <option value="Todos">Todos</option>
            { options.detalles && options.detalles.map( (op, index) => {
              return <option value={op} key={index}>{op}</option>
            })}
          </select>
        </div>
        <div className="filtro">
          <label htmlFor="select-anio">Año:</label>
          <select name="select-anio" id="select-anio" onChange={e => setFiltro( prev => ({ ...prev, year: e.target.value}))}>
            <option value="Todos">Todos</option>
            { options.years && options.years.map( (op, index) => {
              return <option value={op} key={index}>{op}</option>
            })}
          </select>
        </div>
        <div className="filtro">
          <label htmlFor="select-mes">Mes:</label>
          <select name="select-mes" id="select-mes" onChange={e => setFiltro( prev => ({ ...prev, month: e.target.value}))}>
            <option value="Todos">Todos</option>
            { options.months && options.months.map( op => {
              return <option value={op} key={op}>{ monthToText(op) }</option>
            })}
          </select>
        </div>
        <div className="filtro">
          <label htmlFor="filtroObs">Observaciones:</label>
          <input type="text" name="filtroObs" id="filtroObs" onChange={e => setFiltro( prev => ({ ...prev, obs: e.target.value}))} />
        </div>
      </div>

      <div id="contenedor-paginas">
        <button className="boton-paginas" onClick={() => setActualPage(actualPage - 1)} disabled={(actualPage === 1) ? true : false}>&#9664;</button>
        <span className="indicador-paginas">{actualPage} / {pages}</span>
        <button className="boton-paginas" onClick={() => setActualPage(actualPage + 1)} disabled={(actualPage === pages) ? true : false}>&#9654;</button>
      </div>
      
      <div id="contenedor-tabla">
        <table id="tabla-pagos">
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

          { tableData ? tableData.map( (pago, index) => {
            return ( (index >= (actualPage*20 - 20)) && (index < (actualPage*20)) && <FilaPago key={pago._id} pago={pago} showModalDel={showModalDel} showModalUpd={showModalUpd} />)
          }) : null }
          
          </tbody>
        </table>
      </div>

      <div className="contenedor-small-size">
        { tableData && tableData.map( (pago, index) => {
          return ( 
            (index >= (actualPage*20 - 20)) && 
            (index < (actualPage*20)) &&
            <FilaPagoSmall pago={pago} key={pago._id} showModalDel={showModalDel} showModalUpd={showModalUpd} />
          )
        })}
      </div>
      </> }

      {/* Modal add */}
      <ModalAddPago 
        visible={modalAdd} 
        setVisible={setModalAdd}
        username={userinfo.name}
        token={userinfo.token}
        afterAdd={addPago}
      />

      {/* Modal update */}
      <ModalUpdatePago 
        visible={modalUpd} 
        setVisible={setModalUpd} 
        infoupd={infoupd}
        username={userinfo.name}
        token={userinfo.token}
        afterUpdate={updatePago}
      />

      {/* Modal delete */}
      <ModalDeletePago 
        visible={modalDel} 
        setVisible={setModalDel} 
        infodel={infodel}
        username={userinfo.name}
        token={userinfo.token}
        afterDelete={deletePago} 
      />

    </>
  );
}

export default Pagos