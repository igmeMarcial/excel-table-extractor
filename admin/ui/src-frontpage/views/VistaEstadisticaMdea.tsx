import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';
import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import PrimaryNavMdea from '../components/PrimaryNavMdea';
import { VistaEstadisticaProps } from '../types/VistaEstadisticaProps';
import SideNavMdea from '../components/SideNavMdea';

export default function VistaEstadisticaMdea({
  estadistica,
  indiceEstadisticas,
}: Readonly<VistaEstadisticaProps>) {
  return (
    <>
      <MarcoOrdenadorNav />
      <PrimaryNavMdea items={indiceEstadisticas.getItemsNivel1()} />
      <div className="flex sm:flex-col-reverse md:flex-row">
        <div style={{ width: '300px' }} className="bg-gray-100">
          <SideNavMdea indiceEstadisticas={indiceEstadisticas} />
        </div>
        <div className="flex-1 overflow-hidden ">
          <EstadisticaVistaTabs estadistica={estadistica} />
        </div>
      </div>
    </>
  );
}
