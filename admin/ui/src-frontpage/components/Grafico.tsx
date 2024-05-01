import { selectEstadisticaData } from '../app/AppSlice';

import { useAppSelector } from '../app/hooks';
import BlockGrafico from '../../src/public/components/BlockGrafico';

function Grafico() {
  const estadistica = useAppSelector(selectEstadisticaData) || {};
  const graficos = estadistica.graficos || [];
  if (!graficos.length) {
    return <div className="pl-4 pt-4">Sin datos</div>;
  }
  return (
    <div>
      <BlockGrafico estadistica={estadistica} grafico={graficos[0]} />
    </div>
  );
}
export default Grafico;
