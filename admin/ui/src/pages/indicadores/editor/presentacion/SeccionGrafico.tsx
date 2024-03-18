import ReactECharts from 'echarts-for-react';
import { Grafico } from '../../../../types/Grafico';
import chartProspMapper from '../../../../core/EchartsPropsMapper';
import GraficoToolbar from './GraficoToolbar';
import BlockEditorHeader from '../../../../components/BlockEditorHeader';
import ChartOptionsEditor from '../../../../components/chart/ChartOptionsEditor';
interface SeccionGraficoProps {
  index: number;
  options: Grafico;
}
const SeccionGrafico = ({ index, options }: SeccionGraficoProps) => {
  const chartOptions = chartProspMapper.map(options);
  return (
    <div className="border-2 border-solid border-emerald-600 rounded">
      <BlockEditorHeader title="Grafico" />
      <div className="flex">
        <div className='flex-1'>
          <GraficoToolbar grafico={options} graficoIndex={index} />
          <div className="m-4 border rounded border-dashed border-gray-500">
            <div>
              <ReactECharts {...chartOptions} />
            </div>
          </div>
        </div>
        <ChartOptionsEditor chartIndex={index} />
      </div>
    </div>
  );
};

export default SeccionGrafico;
