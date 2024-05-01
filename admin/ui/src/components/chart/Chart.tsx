import ReactECharts from 'echarts-for-react';
import chartProspMapper from '../../core/EchartsPropsMapper';
import { Grafico } from '../../types/Grafico';

interface ChartProps {
  options: Grafico;
}
const Chart = ({ options }: ChartProps) => {
  const chartOptions = chartProspMapper.map(options);
  return (
    <div>
      <ReactECharts {...chartOptions} />
      <div style={{ fontSize: '10px' }}>
        <b>Fuente:</b> {options.fuente}
      </div>
    </div>
  );
};

export default Chart;
