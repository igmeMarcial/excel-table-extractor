import Chart from '../../components/chart/Chart';
import { BlockGraficoEstadisticaDatos } from '../../types/BlockGraficoEstadisticaDatos';
import { Grafico } from '../../types/Grafico';
import {
  determinarSubtituloParaGrafico,
  determinarTituloTablaDatosDefecto,
  removerTextoEntreParentesisDelFinal,
} from '../../utils/estadistica-utils';
import { deepAssign } from '../../utils/object-utils';

interface BlockGraficoProps {
  estadistica: BlockGraficoEstadisticaDatos;
  grafico: Grafico;
}

function BlockGrafico({ grafico, estadistica }: Readonly<BlockGraficoProps>) {
  const options: Grafico = deepAssign({}, grafico);
  options.titulo =
    grafico.titulo ||
    removerTextoEntreParentesisDelFinal(estadistica.presentacionTablaTitulo) ||
    determinarTituloTablaDatosDefecto(
      estadistica.nombre,
      estadistica.periodoSerieTiempo
    );
  options.subtitulo = determinarSubtituloParaGrafico(
    grafico.subtitulo,
    estadistica.presentacionTablaSubtitulo,
    estadistica.presentacionTablaTitulo,
    estadistica.unidadMedida
  );
  options.fuente =
    grafico.fuente || estadistica.presentacionTablaFuente || estadistica.fuente;
  return <Chart options={options}></Chart>;
}

export default BlockGrafico;
