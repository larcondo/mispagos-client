import { useContext } from 'react'
import { UserContext } from '../../contexts/userDetails';

function Inicio() {
  const { userinfo } = useContext(UserContext)
  
  return(
    <>
      <h1>Hola, { userinfo.firstName }!</h1>

      { userinfo?.name && 
        <table className="tabla-resumen">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{ userinfo.name }</td>
            </tr>
            <tr><td>First Name</td><td>{ userinfo.firstName }</td></tr>
            <tr><td>Last Name</td><td>{ userinfo.lastName }</td></tr>
            <tr><td>Email</td><td>{ userinfo.email }</td></tr>
            <tr><td>Token</td><td>{ (userinfo.token !== undefined) ?  '...' + userinfo.token.substr(-8,8) : '' }</td></tr>
          </tbody>
        </table>
      }

    </>
  );
}

export default Inicio