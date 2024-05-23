import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import PrimaryNavOcde from '../components/PrimaryNavOcde';
import PageTitle from '../components/PageTitle';
import { TEXTO_OCDE } from '../../src/config/textos';
import { VistaEstadisticaProps } from '../types/VistaEstadisticaProps';

export default function VistaEstadisticaOcde({
  estadistica,
  indiceEstadisticas,
}: Readonly<VistaEstadisticaProps>) {
  return (
    <>
      <MarcoOrdenadorNav />
      <PageTitle title={'Estadísticas relacionadas con la ' + TEXTO_OCDE} />
      <PrimaryNavOcde indiceEstadisticas={indiceEstadisticas} />
    </>
  );
}
