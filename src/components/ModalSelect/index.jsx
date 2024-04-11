import './index.css'

const ModalSelect = ({ name, label, value, onChange }) => {
  return(
    <div className='recuadro-select'>
      <label htmlFor={name}>{ label }</label>
      <select
        name={name}
        id={name}
        className='modal-select'
        value={value}
        onChange={onChange}
      >
        <option value=''></option>
        <option value='pago'>Pago</option>
        <option value='divisas'>Divisas</option>
      </select>
    </div>
  )
}

export default ModalSelect