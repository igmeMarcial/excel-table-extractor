import ReactECharts from 'echarts-for-react';
import { Grafico } from '../../../../types/Grafico';
import chartProspMapper from '../../../../core/EchartsPropsMapper';
import GraficoToolbar from './GraficoToolbar';
interface SeccionGraficoProps {
  index: number;
  options: Grafico;
}
const SeccionGrafico = ({ index, options }: SeccionGraficoProps) => {
  const chartOptions = chartProspMapper.map(options);
  return (
    <>
      <GraficoToolbar grafico={options} grficoIndex={index} />
      <div className="border border-gray-400 w-full h-100 solid bg-gray-100">
        <ReactECharts {...chartOptions} />
      </div>
    </>
  );
};

export default SeccionGrafico;
