import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';
import PrimaryNavOcde from '../components/PrimaryNavOcde';
import PageTitle from '../components/PageTitle';
import { TEXTO_OCDE } from '../../src/config/textos';
import { VistaEstadisticaProps } from '../types/VistaEstadisticaProps';
import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';

export default function VistaEstadisticaOcde({
  estadistica,
  indiceEstadisticas,
}: Readonly<VistaEstadisticaProps>) {
  return (
    <>
      <MarcoOrdenadorNav />
      <PageTitle title={'Estadísticas relacionadas con la ' + TEXTO_OCDE} />
      <div className="flex sm:flex-col-reverse md:flex-row">
        <div style={{ width: '300px' }} className="bg-gray-100">
          <PrimaryNavOcde indiceEstadisticas={indiceEstadisticas} />
        </div>
        <div className="flex-1 overflow-hidden ">
          <EstadisticaVistaTabs estadistica={estadistica} />
        </div>
      </div>
    </>
  );
}
