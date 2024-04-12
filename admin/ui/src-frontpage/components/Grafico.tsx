import { selectEstadisticaGraficos } from '../app/AppSlice';

import { useAppSelector } from '../app/hooks';
import Chart from '../../src/components/chart/Chart';

function Grafico() {
  const graficos = useAppSelector(selectEstadisticaGraficos);
  if (graficos.length === 0) {
    return <div className="pl-4 pt-4">Sin datos</div>;
  }
  return (
    <div>
      <Chart options={graficos[0]} />
    </div>
  );
}
export default Grafico;
