import '../css/Login.css'
import { useState, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { UserContext } from '../contexts/userDetails'
import { baseUrl } from '../helpers/constants'
import axios from 'axios'

axios.defaults.withCredentials = true

function Login() {
  const [isloading, setIsloading] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [userError, setUserError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const navigate = useNavigate();

  const { setUserinfo } = useContext(UserContext)

  function handleUser( value ) {
    setUserError(null);
    setName(value);
  }

  function handlePassword( value ) {
    setPasswordError(null)
    setPassword(value)
  }

  function login() {
    const data = { name: name, password: password }
    setIsloading(true)
    axios.post(baseUrl, data, {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}, 
    })
    .then(res => {
      if (res.status === 200) {
        const {_id, ...resto} = res.data.userData
        setUserinfo({...resto, token: res.data.accessToken})
        setIsloading(false)
        navigate('home/inicio')
      }
    })
    .catch(err => {
      if (err.response.status === 401) {
        setIsloading(false)
        if (err.response.data.error === 'user') {
          setUserError(err.response.data.message)
          return
        }
        if (err.response.data.error === 'password') {
          setPasswordError(err.response.data.message)
          return
        }
        console.log(err.response?.data?.message)
        console.log(err.response?.data?.error)
      }
    })
  }

  return(
    <>
      <div id="contenedor-login">
        <div id="login-header">
          <h1 className="titulo">User Login</h1>
        </div>
        
        <div>
          <div id="login-form">

            <div className="login-campo">
              <input 
                type="text" 
                name="username" 
                id="login-username" 
                placeholder="Usuario"
                disabled={isloading}
                value={name}
                onChange={e => handleUser(e.target.value)} 
              />
              <p className="login-error-text">{userError}</p>
            </div>

            <div className="login-campo">
              <input 
                type="password" 
                name="password" 
                id="login-password" 
                placeholder="Password"
                disabled={isloading}
                value={password}
                onChange={e => handlePassword(e.target.value)} 
              />
              <p className="login-error-text">{passwordError}</p>
            </div>
            { isloading && <span className="loader"></span> }
            { !isloading && <button className="login-boton" onClick={login}>Ingresar</button> }

            <p className="login-foot-text">
              ¿No tienes un usuario aún? <NavLink to={'/register'}>Registrate!</NavLink>
            </p>

          </div>
        </div>
        
      </div>
    </>
  );
}

export default Login