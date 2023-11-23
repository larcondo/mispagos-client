import '../css/Register.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  validarNombreUsuario,
  validarEmail, 
  validarPassword 
} from '../helpers/general'
import userService from '../services/user'

function Register() {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [passw, setPassw] = useState('')
  const [error, setError] = useState({ type: null, text: null })
  const navigate = useNavigate()

  const registerUser = (event) => {
    event.preventDefault()
    
    const nameWrong = validarNombreUsuario(name)
    if (nameWrong) return setError({ type: 'name', text: nameWrong})

    const emailWrong = validarEmail(email)
    if (emailWrong) return setError({ type: 'email', text: emailWrong})

    const passwordWrong = validarPassword(passw)
    if (passwordWrong) return setError({ type: 'password', text: passwordWrong})

    const data = {
      name,
      password: passw,
      email,
      firstName: fname,
      lastName: lname
    }

    userService.register(data)
    .then( res => {
      if (res.status === 201) {
        alert(res.data.message)
        navigate('/')
      } else {
        alert('Lo sentimos, ocurrió un error al crear el usuario')
      }
    })
    .catch( err => {
      console.log(err)
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
            <form id="register-form" onSubmit={registerUser}>

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
                    setError({ type: null, text: null })
                  }}
                />
                <p className="register-error-text">{ error.type === 'email' ? error.text : null }</p>
              </div>

              <div className="register-campo">
                <label htmlFor="register-name">Nombre de usuario:</label>
                <input type="text" name="register-name" 
                  id="register-name" 
                  placeholder=""
                  value={name}
                  onChange={e => {
                    setName(e.target.value)
                    setError({ type: null, text: null })
                  }} 
                />
                <p className="register-error-text">{ error.type === 'name' ? error.text : null }</p>
              </div>

              <div className="register-campo">
                <label htmlFor="register-password">Contraseña:</label>
                <input type="password" name="register-password" 
                  id="register-password" 
                  placeholder=""
                  value={passw}
                  onChange={e => {
                    setPassw(e.target.value)
                    setError({ type: null, text: null })
                  }} 
                />
                <p className="register-error-text">{ error.type === 'password' ? error.text : null }</p>
              </div>

              <button className="register-boton" type="submit">Registrarse</button>

            </form>
        </div>
        

      </div>

    </>
  );
}

export default Register