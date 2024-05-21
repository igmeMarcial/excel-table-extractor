import PrimaryNavOds from '../components/PrimaryNavOds';
import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import PageTitle from '../components/PageTitle';
import { Estadistica } from '../types/Estadistica';
import { TEXTO_ODS } from '../../src/config/textos';
interface VistaEstadisticaOdsProps {
  estadistica: Estadistica;
}
export default function VistaEstadisticaOds({
  estadistica,
}: Readonly<VistaEstadisticaOdsProps>) {
  return (
    <>
      <MarcoOrdenadorNav />
      <PageTitle title={'Estadísticas relacionadas con los ' + TEXTO_ODS} />
      <PrimaryNavOds />
    </>
  );
}
