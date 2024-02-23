import ReactECharts from 'echarts-for-react';
import { useAppSelector } from '../../../../app/hooks';
import { selectConfigGrafico } from '../../EstadisticaFormSlice';

const Grafico = () => {
  const configGrafico = useAppSelector(selectConfigGrafico(0));
  console.log(configGrafico);
  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: configGrafico.tipoGrafico,
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return (
    <div className="w-3/5">
      <div className="border border-gray-400 w-full h-56 solid bg-gray-100">
        <ReactECharts option={options} />
      </div>
    </div>
  );
};

export default Grafico;
