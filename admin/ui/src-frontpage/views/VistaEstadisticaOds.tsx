import PrimaryNavOds from '../components/PrimaryNavOds';
import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import PageTitle from '../components/PageTitle';
import { TEXTO_ODS } from '../../src/config/textos';
import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';
import { VistaEstadisticaProps } from '../types/VistaEstadisticaProps';
export default function VistaEstadisticaOds({
  estadistica,
  indiceEstadisticas,
}: Readonly<VistaEstadisticaProps>) {
  console.log(indiceEstadisticas);
  return (
    <>
      <MarcoOrdenadorNav />
      <PageTitle title={'Estadísticas relacionadas con los ' + TEXTO_ODS} />
      <PrimaryNavOds indiceEstadisticas={indiceEstadisticas} />
      <EstadisticaVistaTabs estadistica={estadistica} />
    </>
  );
}
