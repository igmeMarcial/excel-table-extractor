import BlockEditorHeader from '../../../../components/BlockEditorHeader';
import ChartOptionsEditor from '../../../../components/chart/ChartOptionsEditor';
import Chart from '../../../../components/chart/Chart';

import { Grafico } from '../../../../types/Grafico';
interface SeccionGraficoProps {
  index: number;
  options: Grafico;
}
const SeccionGrafico = ({ index, options }: SeccionGraficoProps) => {
  return (
    <div className="border-2 border-solid border-emerald-600 rounded">
      <BlockEditorHeader title="Grafico" />
      <div className="flex">
        <div className="flex-1">
          <div className="m-2 border rounded border-dashed border-gray-500">
            <div>
              <Chart options={options}></Chart>
            </div>
          </div>
        </div>
        <ChartOptionsEditor chartIndex={index} />
      </div>
    </div>
  );
};

export default SeccionGrafico;
