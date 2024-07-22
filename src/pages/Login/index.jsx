import '@css/Login.css';
import { useState, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { UserContext } from '@contexts/userDetails';
import userService from '@services/user';
import { setToken } from '@utils/token';

const UNKNOWN_ERROR_TEXT = 'Error desconocido. Inténtelo más tarde.';

function Login() {
  const [isloading, setIsloading] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [unknownError, setUnknownError] = useState(null);

  const navigate = useNavigate();

  const { setUserinfo } = useContext(UserContext);

  function handleUser( value ) {
    setUserError(null);
    setUnknownError(null);
    setName(value);
  }

  function handlePassword( value ) {
    setPasswordError(null);
    setUnknownError(null);
    setPassword(value);
  }

  function login(event) {
    event.preventDefault();

    setIsloading(true);

    userService.login({ name, password })
      .then(res => {
        if (res.status === 200) {
          const { _id, ...userData } = res.data.userData;
          setUserinfo({ ...userData });
          setToken(res.data.accessToken);
          setIsloading(false);
          navigate('home/inicio');
        }
      })
      .catch(err => {
        setIsloading(false);
        if (err.response.status === 401) {
          switch(err.response.data.error) {
          case 'user':
            return setUserError(err.response.data.message);
          case 'password':
            return setPasswordError(err.response.data.message);
          default:
            console.log(err.response);
            return setUnknownError(UNKNOWN_ERROR_TEXT);
          }
        } else {
          console.log(err);
          setUnknownError(UNKNOWN_ERROR_TEXT);
        }
      });
  }

  return(
    <>
      <div id="contenedor-login">
        <div id="login-header">
          <h1 className="titulo">User Login</h1>
        </div>

        <div>
          <form id="login-form" onSubmit={login}>

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
            { !isloading && <button className="login-boton" type="submit">Ingresar</button> }

            <p className="login-error-text">{unknownError}</p>

            <p className="login-foot-text">
              ¿No tienes un usuario aún? <NavLink to={'/register'}>Registrate!</NavLink>
            </p>

          </form>
        </div>
      </div>
    </>
  );
}

export default Login;