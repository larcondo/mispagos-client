import './index.css';
import { Each } from '@/Each';

const ChartBarButtons = ({ options, activeOption, onClick }) => {
  if (!options) return null;

  return(
    <div className="chart-bar-botones">
      <Each of={options} render={(item, index) => (
        <button key={index} onClick={() => onClick(item)}
          className={`chart-bar-boton ${ activeOption === item ? 'active' : '' }`}
        >
          { item }
        </button>
      )}
      />
    </div>
  );
};

export default ChartBarButtons;