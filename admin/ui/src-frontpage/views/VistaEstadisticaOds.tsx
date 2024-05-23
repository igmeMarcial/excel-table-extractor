import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import PageTitle from '../components/PageTitle';
import { TEXTO_ODS } from '../../src/config/textos';
import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';
import { VistaEstadisticaProps } from '../types/VistaEstadisticaProps';
import { SideNavOds } from '../components/SideNavOds';
export default function VistaEstadisticaOds({
  estadistica,
  indiceEstadisticas,
}: Readonly<VistaEstadisticaProps>) {
  return (
    <>
      <MarcoOrdenadorNav />
      <PageTitle title={'Estadísticas relacionadas con los ' + TEXTO_ODS} />
      <SideNavOds indiceEstadisticas={indiceEstadisticas} />
      <EstadisticaVistaTabs estadistica={estadistica} />
    </>
  );
}
