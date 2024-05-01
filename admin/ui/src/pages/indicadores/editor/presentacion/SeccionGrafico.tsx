import BlockEditorHeader from '../../../../components/BlockEditorHeader';
import ChartOptionsEditor from '../../../../components/chart/ChartOptionsEditor';

import { Grafico } from '../../../../types/Grafico';
import BlockGrafico from '../../../../public/components/BlockGrafico';
import { useAppSelector } from '../../../../app/hooks';
import { selectEstadisticaValues } from '../../EstadisticaFormSlice';
interface SeccionGraficoProps {
  index: number;
  options: Grafico;
}
const SeccionGrafico = ({ index, options }: SeccionGraficoProps) => {
  const estadistica = useAppSelector(selectEstadisticaValues);
  return (
    <div className="border-2 border-solid border-emerald-600 rounded">
      <BlockEditorHeader title="Grafico" />
      <div className="flex">
        <div className="flex-1">
          <div className="m-2 border border-solid border-gray-300 bg-white">
            <div>
              <BlockGrafico
                estadistica={estadistica}
                grafico={options}
              ></BlockGrafico>
            </div>
          </div>
        </div>
        <ChartOptionsEditor chartIndex={index} />
      </div>
    </div>
  );
};

export default SeccionGrafico;
