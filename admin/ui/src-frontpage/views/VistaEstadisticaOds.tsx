import PrimaryNavOds from '../components/PrimaryNavOds';
import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import PageTitle from '../components/PageTitle';
import { Estadistica } from '../types/Estadistica';
import { TEXTO_ODS } from '../../src/config/textos';
import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';
export interface VistaEstadisticaOdsProps {
  estadistica: Estadistica;
  indiceEstadisticas: any[];
}
export default function VistaEstadisticaOds({
  estadistica,
  indiceEstadisticas,
}: Readonly<VistaEstadisticaOdsProps>) {
  console.log(indiceEstadisticas);
  return (
    <>
      <MarcoOrdenadorNav />
      <PageTitle title={'Estadísticas relacionadas con los ' + TEXTO_ODS} />
      <PrimaryNavOds />
      <EstadisticaVistaTabs estadistica={estadistica} />
    </>
  );
}
