import '../../css/Config.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/userDetails';
import { MdEditSquare } from 'react-icons/md';

import configService from '../../services/config';

function Config() {
  const { userinfo, setUserinfo } = useContext(UserContext);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const styleIcons = {
    position: 'relative', top: '2px'
  };

  return(
    <>
      <h1 className="titulo">Configuración</h1>

      <table id="config-tabla">
        <tbody>
          <ConfigFila text={'Nombre de usuario:'} value={ userinfo.name }></ConfigFila>

          <ConfigFila text={'Nombre:'} value={ userinfo.firstName }>
            <button className="config-edit-boton" id="config-boton-firstname" onClick={() => setModal1(!modal1)}>
              <MdEditSquare style={styleIcons} /><span className="config-edit-boton-text">Modificar</span>
            </button>
          </ConfigFila>

          <ConfigFila text={'Apellido:'} value={ userinfo.lastName }>
            <button className="config-edit-boton" id="config-boton-lastname" onClick={() => setModal2(!modal2)}>
              <MdEditSquare style={styleIcons} /><span className="config-edit-boton-text">Modificar</span>
            </button>
          </ConfigFila>

          <ConfigFila text={'E-mail:'} value={ userinfo.email }>
            <button className="config-edit-boton" id="config-boton-email" onClick={() => setModal3(!modal3)}>
              <MdEditSquare style={styleIcons} /><span className="config-edit-boton-text">Modificar</span>
            </button>
          </ConfigFila>

          <ConfigFila text={'Rol:'} value={ userinfo.roles }></ConfigFila>
        </tbody>
      </table>

      <ModalConfigFirstName
        visible={modal1}
        setVisible={setModal1}
        userinfo={userinfo}
        setUserinfo={setUserinfo}
      />

      <ModalConfigLastName
        visible={modal2}
        setVisible={setModal2}
        userinfo={userinfo}
        setUserinfo={setUserinfo}
      />

      <ModalConfigEmail
        visible={modal3}
        setVisible={setModal3}
        userinfo={userinfo}
        setUserinfo={setUserinfo}
      />

    </>
  );
}

function ConfigFila(props) {
  return(
    <tr>
      <td>{ props.text }</td>
      <td>{ props.value }</td>
      <td>{ props.children }</td>
    </tr>
  );
}

function ModalConfigFirstName({ visible, setVisible, userinfo, setUserinfo }) {

  const updateFirstName = () => {
    const newFirstName = document.getElementById('newFirstName');
    const data = { name: userinfo.name, firstName: newFirstName.value };

    configService.changeFirstName(data, userinfo.token)
      .then( response => {
        if (response.status === 200) {
          setUserinfo({ ...userinfo, firstName: newFirstName.value });
          setVisible(false);
          newFirstName.value = '';
        }
      })
      .catch( err => {
        console.log(err);
        alert('Hubo un error');
      });
  };

  return(
    <div className="modal" style={{ display: (visible) ? 'flex' : 'none' }}>
      <div className="modal-header">
        <p>Actualizar Nombre:</p>
      </div>

      <table className="modal-table">
        <tbody>
          <tr>
            <td>Nombre actual:</td>
            <td>{ userinfo.firstName }</td>
          </tr>
          <tr>
            <td>Nombre nuevo:</td>
            <td>
              <input type="text" name="newFirstName" id="newFirstName" />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="modal-botones">
        <button className="boton" onClick={() => setVisible(false)}>Cancelar</button>
        <button className="boton" onClick={updateFirstName}>Actualizar</button>
      </div>
    </div>
  );
}

function ModalConfigLastName({ visible, setVisible, userinfo, setUserinfo }) {
  const updateLastName = () => {
    const newLastName = document.getElementById('newLastName');
    const data = { name: userinfo.name, lastName: newLastName.value };

    configService.changeLastName(data, userinfo.token)
      .then( response => {
        if (response.status === 200) {
          setUserinfo({ ...userinfo, lastName: newLastName.value });
          newLastName.value = '';
          setVisible(false) ;
        }
      })
      .catch( err => {
        console.log(err);
        alert('Hubo un error');
      });
  };

  return(
    <div className="modal" style={{ display: (visible) ? 'flex' : 'none' }}>

      <div className="modal-header">
        <p>Actualizar Apellido:</p>
      </div>

      <table className="modal-table">
        <tbody>
          <tr>
            <td>Apellido actual:</td>
            <td>{ userinfo.lastName }</td>
          </tr>
          <tr>
            <td>Apellido nuevo:</td>
            <td><input type="text" name="newLastName" id="newLastName" /></td>
          </tr>
        </tbody>
      </table>

      <div className="modal-botones">
        <button className="boton" onClick={() => setVisible(false)}>Cancelar</button>
        <button className="boton" onClick={updateLastName}>Actualizar</button>
      </div>

    </div>
  );
}

function ModalConfigEmail({ visible, setVisible, userinfo, setUserinfo }) {
  const updateEmail = () => {
    const newEmail = document.getElementById('newEmail');
    const data = { name: userinfo.name, email: newEmail.value };

    configService.changeEmail(data, userinfo.token)
      .then( response => {
        if (response.status === 200) {
          setUserinfo({ ...userinfo, email: newEmail.value });
          newEmail.value = '';
          setVisible(false);
        }
      })
      .catch( err => {
        console.log(err);
        alert('Hubo un error');
      });
  };

  return(
    <div className="modal" style={{ display: (visible) ? 'flex' : 'none' }}>
      <div className="modal-header">
        <p>Actualizar E-mail:</p>
      </div>

      <table className="modal-table">
        <tbody>
          <tr>
            <td>E-mail actual:</td>
            <td>{ userinfo.email }</td>
          </tr>
          <tr>
            <td>E-mail nuevo:</td>
            <td><input type="text" name="newEmail" id="newEmail" /></td>
          </tr>
        </tbody>
      </table>
      <div className="modal-botones">
        <button className="boton" onClick={() => setVisible(false)}>Cancelar</button>
        <button className="boton" onClick={updateEmail}>Actualizar</button>
      </div>
    </div>
  );
}


export default Config;