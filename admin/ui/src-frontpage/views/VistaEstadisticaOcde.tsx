import { Estadistica } from '../types/Estadistica';
import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import PrimaryNavOcde from '../components/PrimaryNavOcde';
interface VistaEstadisticaOcdeProps {
  estadistica: Estadistica;
}
export default function VistaEstadisticaOcde({
  estadistica,
}: Readonly<VistaEstadisticaOcdeProps>) {
  return (
    <>
      <MarcoOrdenadorNav />
      <PrimaryNavOcde />
    </>
  );
}
