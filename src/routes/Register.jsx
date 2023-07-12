import '../css/Register.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  validarNombreUsuario,
  validarEmail, 
  validarPassword 
} from '../helpers/general'
import { baseUrl } from '../helpers/constants'
import axios from 'axios'

axios.defaults.withCredentials = true

function Register() {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [passw, setPassw] = useState('')
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorName, setErrorName] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)
  const navigate = useNavigate()

  const registerUser = () => {
    const data = {
      name: name,
      password: passw,
      email: email,
      firstName: fname,
      lastName: lname
    }

    const nameWrong = validarNombreUsuario(name)
    if (nameWrong) return setErrorName(nameWrong)

    const emailWrong = validarEmail(email)
    if (emailWrong) return setErrorEmail(emailWrong)

    const passwordWrong = validarPassword(passw)
    if (passwordWrong) return setErrorPassword(passwordWrong)

    const postHeaders = {'Content-Type': 'application/json'}
    axios.post(baseUrl + 'register', data, {
      withCredentials: true,
      headers: postHeaders
    })
    .then( res => {
      if (res.status === 201) {
        alert(res.data.message)
        navigate('/')
      } else {
        alert('Lo sentimos, ocurrió un error al crear el usuario')
      }
    })
    .catch( err => {
      alert('Hubo un error al crear el usuario')
    })

    
  }

  return(
    <>
      <div id="contenedor-register">
        <div id="register-header">
          <h1 className="titulo">Nuevo Usuario</h1>
          <p>Complete los datos para registrarse</p>
        </div>

        <div>
            <div id="register-form">

              <div className="register-campo">
                <label htmlFor="register-fname">Nombre:</label>
                <input type="text" name="register-fname" 
                  id="register-fname" 
                  placeholder=""
                  value={fname}
                  onChange={e => setFname(e.target.value)} 
                />
              </div>
              
              <div className="register-campo">
                <label htmlFor="register-lname">Apellido:</label>
                <input type="text" name="register-lname" 
                  id="register-lname" 
                  placeholder=""
                  value={lname}
                  onChange={e => setLname(e.target.value)} 
                />
              </div>

              <div className="register-campo">
                <label htmlFor="register-email">Email:</label>
                <input type="email" name="register-email" 
                  id="register-email" 
                  placeholder=""
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                    setErrorEmail('')
                  }}
                />
                <p className="register-error-text">{ errorEmail }</p>
              </div>

              <div className="register-campo">
                <label htmlFor="register-name">Nombre de usuario:</label>
                <input type="text" name="register-name" 
                  id="register-name" 
                  placeholder=""
                  value={name}
                  onChange={e => {
                    setName(e.target.value)
                    setErrorName('')
                  }} 
                />
                <p className="register-error-text">{ errorName }</p>
              </div>

              <div className="register-campo">
                <label htmlFor="register-password">Contraseña:</label>
                <input type="password" name="register-password" 
                  id="register-password" 
                  placeholder=""
                  value={passw}
                  onChange={e => {
                    setPassw(e.target.value)
                    setErrorPassword('')
                  }} 
                />
                <p className="register-error-text">{ errorPassword }</p>
              </div>

              <button className="register-boton" onClick={registerUser}>Registrarse</button>

            </div>
        </div>
        

      </div>

    </>
  );
}

export default Register