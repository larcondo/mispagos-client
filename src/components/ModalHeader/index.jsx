import './index.css';

const ModalHeader = ({ title = 'TITLE', subtitle }) => {
  return(
    <div className='modal-header'>
      <p>{ title }</p>
      { subtitle &&
        <p className='subtitle'>{ subtitle }</p>
      }
    </div>
  );
};

export default ModalHeader;