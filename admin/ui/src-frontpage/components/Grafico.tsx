import ReactECharts from 'echarts-for-react';
import { selectEstadisticaGraficos } from '../app/AppSlice';

import ChartProspMapper from '../../src/core/EchartsPropsMapper';
import { useAppSelector } from '../app/hooks';

function Grafico() {
  const graficos = useAppSelector(selectEstadisticaGraficos);
  if (graficos.length === 0) {
    return <div className="pl-4 pt-4">Sin datos</div>;
  }
  const chartOptions = ChartProspMapper.map(graficos[0]);
  return (
    <div>
      <ReactECharts {...chartOptions} />
    </div>
  );
}
export default Grafico;
