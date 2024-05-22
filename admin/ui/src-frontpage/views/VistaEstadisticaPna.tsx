import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import PrimaryNavPna from '../components/PrimaryNavPna';
import PageTitle from '../components/PageTitle';
import { TEXTO_PNA } from '../../src/config/textos';
import { VistaEstadisticaProps } from '../types/VistaEstadisticaProps';

export default function VistaEstadisticaPna({
  estadistica,
}: Readonly<VistaEstadisticaProps>) {
  return (
    <>
      <MarcoOrdenadorNav />
      <PageTitle title={'Estadísticas relacionadas con la ' + TEXTO_PNA} />
      <PrimaryNavPna />
    </>
  );
}
