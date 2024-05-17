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
    </>
  );
}
