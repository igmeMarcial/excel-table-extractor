import Chart from '../../components/chart/Chart';
import { Estadistica } from '../../types/Estadistica';
import { Grafico } from '../../types/Grafico';
import {
  determinarSubtituloParaGrafico,
  determinarTituloTablaDatosDefecto,
} from '../../utils/estadistica-utils';
import { deepAssign } from '../../utils/object-utils';

interface BlockGraficoProps {
  estadistica: Estadistica;
  grafico: Grafico;
}

function BlockGrafico({ grafico, estadistica }: Readonly<BlockGraficoProps>) {
  const options: Grafico = deepAssign({}, grafico);
  options.titulo =
    grafico.titulo ||
    estadistica.presentacionTablaTitulo ||
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
