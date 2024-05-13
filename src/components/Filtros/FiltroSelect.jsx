const FiltroSelect = ({ name, label, values, onChange, modifier = null }) => {
  if(!values) return null;

  return(
    <div className='filtro'>
      <label htmlFor={name}>{ label }</label>
      <select name={name} id={name} onChange={onChange}>
        <option value='Todos'>Todos</option>
        { values.map( (op, index) => {
          return <option value={op} key={index}>
            { modifier ? modifier(op) : op }
          </option>;
        })}
      </select>
    </div>
  );
};

export default FiltroSelect;