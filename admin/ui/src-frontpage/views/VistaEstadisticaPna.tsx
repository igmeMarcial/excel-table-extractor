import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import PrimaryNavPna from '../components/PrimaryNavPna';
import PageTitle from '../components/PageTitle';
import { Estadistica } from '../types/Estadistica';
import { TEXTO_PNA } from '../../src/config/textos';
interface VistaEstadisticaPnaProps {
  estadistica: Estadistica;
}
export default function VistaEstadisticaPna({
  estadistica,
}: Readonly<VistaEstadisticaPnaProps>) {
  return (
    <>
      <MarcoOrdenadorNav />
      <PageTitle title={'Estadísticas relacionadas con la ' + TEXTO_PNA} />
      <PrimaryNavPna />
    </>
  );
}
