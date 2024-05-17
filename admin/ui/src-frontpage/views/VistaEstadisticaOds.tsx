import NabAside from '../components/NabAside';
import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';
import { Estadistica } from '../types/Estadistica';
import PrimaryNavOds from '../components/PrimaryNavOds';
import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
interface VistaEstadisticaOdsProps {
  estadistica: Estadistica;
}
export default function VistaEstadisticaOds({
  estadistica,
}: Readonly<VistaEstadisticaOdsProps>) {
  return (
    <>
      <MarcoOrdenadorNav />
      <PrimaryNavOds />
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
