import Chart from '../../components/chart/Chart';
import { Estadistica } from '../../types/Estadistica';
import { Grafico } from '../../types/Grafico';
import {
  determinarSubtituloParaGrafico,
  getUnidadMedidaParaSubtitulo,
} from '../../utils/estadistica-utils';
import { deepAssign } from '../../utils/object-utils';

interface BlockGraficoProps {
  estadistica: Estadistica;
  grafico: Grafico;
}

function BlockGrafico({ grafico, estadistica }: Readonly<BlockGraficoProps>) {
  console.log('BlockGrafico', grafico);
  const options: Grafico = deepAssign({}, grafico);
  options.titulo = grafico.titulo || estadistica.nombre;
  options.subtitulo = determinarSubtituloParaGrafico(
    grafico.subtitulo,
    estadistica.presentacionTablaSubtitulo,
    estadistica.presentacionTablaTitulo,
    estadistica.unidadMedida
  );
  return <Chart options={options}></Chart>;
}

export default BlockGrafico;
