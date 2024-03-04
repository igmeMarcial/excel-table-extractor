import ReactECharts from 'echarts-for-react';
import { useAppSelector } from '../../../../app/hooks';
import { Grafico } from '../../../../types/Grafico';
import {
  selectGraficoOpcionesDefecto,
  selectRecomendacionGrafica,
} from '../../EstadisticaFormSlice';
import graficoHelper from '../../../../helpers/GraficoHelper';
interface SeccionGraficoProps {
  index: number;
  options: Grafico;
}
const SeccionGrafico = ({ index, options }: SeccionGraficoProps) => {
  const defaults = useAppSelector(selectGraficoOpcionesDefecto);
  const recomendacionGrafica = useAppSelector(selectRecomendacionGrafica);
  const echartOptions = graficoHelper.toEchartsProps(options);
  console.log('echartOptions: ', echartOptions);
  let fullOptions = graficoHelper.deepAssign({}, defaults, echartOptions);
  console.log('fullOptions: ', fullOptions);
  return (
    <div className="w-3/5">
      <div className="border border-gray-400 w-full h-56 solid bg-gray-100">
        <ReactECharts {...fullOptions} />
      </div>
    </div>
  );
};

export default SeccionGrafico;
