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
      <div className="flex sm:flex-col-reverse md:flex-row">
        <div style={{ width: '350px' }} className="bg-gray-100">
          <SideNavOds indiceEstadisticas={indiceEstadisticas} />
        </div>
        <div className="flex-1 overflow-hidden ">
          <EstadisticaVistaTabs estadistica={estadistica} />
        </div>
      </div>
    </>
  );
}
