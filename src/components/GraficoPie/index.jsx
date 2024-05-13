import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

function GraficoPie( props ) {

  if (!props.data) return null;

  const pieOptions = {
    plugins: {
      title: {
        display: false,
        text: 'Mi pie chart'
      },
      legend: {
        display: true,
        position: 'right',
        align: 'center',
        labels: {
          boxWidth: 10,
          fontColor: 'black',
          padding: 10
        }
      },
    }
  };

  const plugins = [
    {
      afterDraw: function (chart) {
        // console.log(chart)
        if (chart.data.datasets[0].data.length < 1) {
          let ctx = chart.ctx;
          let width = chart.width;
          let height = chart.height;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          // ctx.font = "30px Arial";
          ctx.fillText('No hay datos disponibles', width / 2, height / 2);
          ctx.restore();
        }
      }
    }
  ];

  return(
    <Pie
      datasetIdKey="importe"
      data={props.data}
      options={pieOptions}
      plugins={plugins}
      className="chart-pie" />
  );
}

export default GraficoPie;