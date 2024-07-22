import { Each } from '@/Each';

const ChartPieSelect = ({ name, label, value, onChange, options, modifier }) => {
  return(
    <>
      <label htmlFor={name}><span>{ label }</span>
        <select name={name} id={name} value={value} onChange={(e) => { onChange(e.target.value);}}>
          <Each of={options} render={(item, index) => (
            <option value={item} key={index}>{ modifier ? modifier(item) : item }</option>
          )} />
        </select>
      </label>
    </>
  );
};

export default ChartPieSelect;