import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import PrimaryNavOcde from '../components/PrimaryNavOcde';
import PageTitle from '../components/PageTitle';
import { Estadistica } from '../types/Estadistica';
import { TEXTO_OCDE } from '../../src/config/textos';
interface VistaEstadisticaOcdeProps {
  estadistica: Estadistica;
}
export default function VistaEstadisticaOcde({
  estadistica,
}: Readonly<VistaEstadisticaOcdeProps>) {
  return (
    <>
      <MarcoOrdenadorNav />
      <PageTitle title={'Estadísticas relacionadas con la ' + TEXTO_OCDE} />
      <PrimaryNavOcde />
    </>
  );
}
