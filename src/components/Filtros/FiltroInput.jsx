const FiltroInput = ({ name, label, onChange }) => {
  return(
    <div className='filtro'>
      <label htmlFor={name}>{ label }</label>
      <input type='text' name={name} id={name} onChange={onChange} />
    </div>
  );
};

export default FiltroInput;