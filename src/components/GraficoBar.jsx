import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';


function GraficoBar( props ) {

  const barOptions = {
    scales: {
      x: {
        ticks: {
          // display: false,
          display: function(context) {
            return context.chart.width > 400
          },
          color: 'hsl(240, 38%, 44%)',
          // minRotation: 90,
          // maxRotation: 90,
          font: {
            family: 'Arial',
            style: 'italic',
            size: '12pt'
          },
        }
      },
      y: {
        ticks: {
          color: 'hsl(240, 38%, 44%)',
          font: {
            family: 'Arial',
            style: 'italic',
            size: function(context) {
              var chH = context.chart.height;
              var size = Math.round(chH / 20);
              return (chH < 300) ? `${size}px` : '12pt';
            }
          },
          callback: function(value, index, ticks) {
            return '$ ' + value;
          }
        }
      }
    },
    plugins: {
      title: { 
        display: false, 
        text: 'Mi bar chart' 
      },
      legend: { 
        display: false, 
        position: 'top',
        // align: 'center',
        labels: {
          boxWidth: 20,
          color: 'hsl(240, 38%, 44%)',
          padding: 10,
        } 
      },
    }
  }

  return(
    <Bar datasetIdKey="importe" data={props.data} options={barOptions} />
  );
}

export default GraficoBar;