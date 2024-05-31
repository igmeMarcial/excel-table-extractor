import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import { TEXTO_OCDE } from '../../src/config/textos';
import { VistaEstadisticaProps } from '../types/VistaEstadisticaProps';
import PageDescription from '../components/PageDescription';

export default function VistaEstadisticaOcde({
  estadistica,
  indiceEstadisticas,
}: Readonly<VistaEstadisticaProps>) {
  return (
    <>
      <MarcoOrdenadorNav />
      <PageDescription
        title={'Estadísticas relacionadas con la ' + TEXTO_OCDE}
        text="Actualmente sin estadísticas"
      />
    </>
  );
}
