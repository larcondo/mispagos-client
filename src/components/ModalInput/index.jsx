import './index.css'

const ModalInput = ({ type, name, label, value, onChange }) => {
  return(
    <div className='recuadro-input'>

      <label htmlFor={name}>{ label }</label>

      <input type={type}
        name={name}
        id={name}
        className='modal-input'
        value={value}
        onChange={onChange}
        step={type === 'number' ? '0.01' : null}
      />
    </div>
  )
}

export default ModalInput