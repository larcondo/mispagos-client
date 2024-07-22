import '@css/Config.css';
import { UserContext } from '@contexts/userDetails';
import { useContext, useState } from 'react';
import { MdEditSquare } from 'react-icons/md';

import configService from '@services/config';

import ModalConfig from '@components/ModalConfig';

function Config() {
  const { userinfo, setUserinfo } = useContext(UserContext);
  const [modalActive, setModalActive] = useState('');
  const styleIcons = {
    position: 'relative',
    top: '2px',
  };

  const updateFirstName = (value) => {
    const data = { name: userinfo.name, firstName: value };

    configService.changeFirstName(data)
      .then( response => {
        if (response.status === 200) {
          setUserinfo({ ...userinfo, firstName: value });
          setModalActive('');
        }
      })
      .catch( err => {
        console.log(err);
        alert('Hubo un error');
      });
  };

  const updateLastName = (value) => {
    const data = { name: userinfo.name, lastName: value };

    configService.changeLastName(data)
      .then( response => {
        if (response.status === 200) {
          setUserinfo({ ...userinfo, lastName: value });
          setModalActive('');
        }
      })
      .catch( err => {
        console.log(err);
        alert('Hubo un error');
      });
  };

  const updateEmail = (value) => {
    const data = { name: userinfo.name, email: value };

    configService.changeEmail(data)
      .then( response => {
        if (response.status === 200) {
          setUserinfo({ ...userinfo, email: value });
          setModalActive('');
        }
      })
      .catch( err => {
        console.log(err);
        alert('Hubo un error');
      });
  };

  return(
    <>
      <h1 className='titulo'>Configuración</h1>

      <table id='config-tabla'>
        <tbody>
          <ConfigFila text={'Nombre de usuario:'} value={ userinfo.name }></ConfigFila>

          <ConfigFila text={'Nombre:'} value={ userinfo.firstName }>
            <button className='config-edit-boton' id='config-boton-firstname' onClick={() => setModalActive('firstName')}>
              <MdEditSquare style={styleIcons} />
              <span className='config-edit-boton-text'>
                Modificar
              </span>
            </button>
          </ConfigFila>

          <ConfigFila text={'Apellido:'} value={ userinfo.lastName }>
            <button className='config-edit-boton' id='config-boton-lastname' onClick={() => setModalActive('lastName')}>
              <MdEditSquare style={styleIcons} />
              <span className='config-edit-boton-text'>
                Modificar
              </span>
            </button>
          </ConfigFila>

          <ConfigFila text={'E-mail:'} value={ userinfo.email }>
            <button className='config-edit-boton' id='config-boton-email' onClick={() => setModalActive('email')}>
              <MdEditSquare style={styleIcons} />
              <span className='config-edit-boton-text'>
                Modificar
              </span>
            </button>
          </ConfigFila>

          <ConfigFila text={'Rol:'} value={ userinfo.roles }></ConfigFila>
        </tbody>
      </table>

      <ModalConfig
        title='Actualizar Nombre'
        actualValue={userinfo.firstName}
        visible={modalActive === 'firstName'}
        setVisible={setModalActive}
        onAcept={updateFirstName}
      />

      <ModalConfig
        title='Actualizar Apellido'
        actualValue={userinfo.lastName}
        visible={modalActive === 'lastName'}
        setVisible={setModalActive}
        onAcept={updateLastName}
      />

      <ModalConfig
        title='Actualizar E-mail'
        actualValue={userinfo.email}
        visible={modalActive === 'email'}
        setVisible={setModalActive}
        onAcept={updateEmail}
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

export default Config;