import '../css/Home.css'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/userDetails';
import { baseUrl } from '../helpers/constants'
import axios from 'axios';
import { 
  MdAccountCircle, MdHome, MdPayments, MdBarChart, MdSettings
} from 'react-icons/md'
axios.defaults.withCredentials = true

// const INTERVALO_REFRESH = 1000 * 60 * 14
const INTERVALO_REFRESH = 1000 * 60 * 15

window.onclick = function(event) {
  const submenu = document.getElementById('submenu')
  if (event.target === null) return

  if (submenu === null) return

  if (!event.target.closest("#submenu") && !event.target.closest("#user-boton")) submenu.style.display = 'none'

}

function Home() {
  const { userinfo, setUserinfo } = useContext(UserContext)
  const navigate = useNavigate()
  const styleUserIcon = {
    position: 'relative', top: '3px', fontSize: '1.2em'
  }
  const styleNavIcon = {
    position: 'relative', top: '2px', margin: '0 3px'
  }

  function getNewToken () {
    setTimeout(() => {
      axios.get(`${baseUrl}/refresh`, { withCredentials: true })
      .then( response => {
        if (response.status === 200) {
          setUserinfo( prev => {return {...prev, token: response.data.accessToken}})
        } else {
          alert('No se recibio el access token')
          logout()
        }
      })
      .catch( error => {
        alert('Error al refrescar token!')
        logout()
      })

      getNewToken()
    }, INTERVALO_REFRESH)

  }


  useEffect(() => {
    if (!userinfo.name) { 
      navigate('/')
    }

    getNewToken()

  }, [])

  const logout = () => {
    const data = { name: userinfo.name }

    axios.get(`${baseUrl}/logout`, data, { withCredentials: true })
    .then(res => {
      if(res.status === 200) {
        setUserinfo({})
        navigate('/')
      }
    })
    .catch(err => {
      alert('Error en logout - Home')
      console.log(err?.response?.status)
    })
  }

  const navlinkClass = ({ isActive, isPending }) => {
    return isPending ? "" : isActive ? "home-link-active" : "home-links" 
  }

  return(
    <div id="contenedor-home">
      <div id="home-encabezado">
        <div>
          <h1>Mis Pagos</h1>
        </div>
        <div>
          <button id="user-boton" onClick={() => {
            document.getElementById('submenu').style.display = 'flex'             
          }}>
            <MdAccountCircle style={styleUserIcon} id="user-icon" /> { userinfo.name }
          </button>
        </div>
      </div>

      <div id="submenu">
        <NavLink to={'config'} className="home-links" onClick={() => {
          document.getElementById('submenu').style.display = 'none' 
        }}>Configuraciones</NavLink>
        <button className="boton" onClick={logout}>Cerrar Sesión</button>
      </div>

      <nav id="home-navbar">
        <ul>
          <li className="home-li">
            <NavLink to={'inicio'} className={navlinkClass}>
              <MdHome style={styleNavIcon} /> Home
            </NavLink>
          </li>
          <li className="home-li">
            <NavLink to={'pagos'} className={navlinkClass}>
              <MdPayments style={styleNavIcon} /> Pagos
            </NavLink>
          </li>
          <li className="home-li">
            <NavLink to={'graficas'} className={navlinkClass}>
              <MdBarChart style={styleNavIcon} /> Graficas
            </NavLink>
          </li>
          <li className="home-li">
            <NavLink to={'config'} className={navlinkClass}>
              <MdSettings style={styleNavIcon} /> Ajustes
            </NavLink>
          </li>
        </ul>
      </nav>
      <div id="home-pages">
        {/* Donde se renderizan las sub-paginas */}
        <Outlet />
      </div>
      <footer id="home-footer">
        <p>Creado por: Lucas</p>
        <p>React + NodeJS + Express</p>
      </footer>
    </div>
  );
}

export default Home