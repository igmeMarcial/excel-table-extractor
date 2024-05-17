import { Estadistica } from '../types/Estadistica';
import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import PrimaryNavPna from '../components/PrimaryNavPna';
interface VistaEstadisticaPnaProps {
  estadistica: Estadistica;
}
export default function VistaEstadisticaPna({
  estadistica,
}: Readonly<VistaEstadisticaPnaProps>) {
  return (
    <>
      <MarcoOrdenadorNav />
      <PrimaryNavPna />
    </>
  );
}
