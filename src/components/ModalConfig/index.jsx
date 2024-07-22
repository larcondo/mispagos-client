import '@css/components/Modals.css';
import { useState } from 'react';
import ModalHeader from '@components/ModalHeader';

const ModalConfig = ({ visible, setVisible, onAcept, title, actualValue }) => {
  const [value, setValue] = useState('');

  const hideModal = () => {
    setVisible(false);
    setValue('');
  };
  const confirmUpdate = () => {
    onAcept(value);
    setValue('');
  };

  if (!visible) return null;

  return(
    <div className='modal'>
      <ModalHeader title={title} />
      <div className='modal-values'>
        <span>Actual:</span>
        <span>{ actualValue }</span>
        <span>Nuevo:</span>
        <span>
          <input
            type='text'
            name='config-value'
            id='config-value'
            className='config-value'
            value={value}
            onChange={e => setValue(e.target.value)}
            autoComplete='off'
          />
        </span>
      </div>
      <div className='modal-botones'>
        <button className='boton' onClick={hideModal}>
          Cancelar
        </button>
        <button className='boton' onClick={confirmUpdate}>
          Actualizar
        </button>
      </div>
    </div>
  );
};

export default ModalConfig;