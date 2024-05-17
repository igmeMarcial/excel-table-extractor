import NabAside from '../components/NabAside';
import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';
import NamePanelComponents from '../components/NamePanelComponents';
import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import { Estadistica } from '../types/Estadistica';
interface VistaEstadisticaDefectoProps {
  estadistica: Estadistica;
}
export default function VistaEstadisticaDefecto({
  estadistica,
}: Readonly<VistaEstadisticaDefectoProps>) {
  return (
    <>
      <MarcoOrdenadorNav />
      <NamePanelComponents />
      <div className="flex sm:flex-col-reverse md:flex-row">
        <div style={{ width: '300px' }} className="bg-gray-100">
          <NabAside />
        </div>
        <div className="flex-1 overflow-hidden ">
          <EstadisticaVistaTabs estadistica={estadistica} />
        </div>
      </div>
    </>
  );
}
