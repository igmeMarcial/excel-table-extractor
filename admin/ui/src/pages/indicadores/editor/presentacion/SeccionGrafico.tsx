import ReactECharts from 'echarts-for-react';
import { Grafico } from '../../../../types/Grafico';
import chartProspMapper from '../../../../core/EchartsPropsMapper';
import GraficoToolbar from './GraficoToolbar';
import BlockEditorHeader from '../../../../components/BlockEditorHeader';
interface SeccionGraficoProps {
  index: number;
  options: Grafico;
}
const SeccionGrafico = ({ index, options }: SeccionGraficoProps) => {
  const chartOptions = chartProspMapper.map(options);
  return (
    <div className="border-2 border-solid border-emerald-600 rounded">
      <BlockEditorHeader title="Grafico" />
      <GraficoToolbar grafico={options} graficoIndex={index} />
      <div className='m-4 border rounded border-dashed border-gray-500'>
        <div>
          <ReactECharts {...chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default SeccionGrafico;
