import NabAside from '../components/NabAside';
import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';
import EstadisticasNav from '../blocks/EstadisticasNav';
import { ColorsType } from '../types/Colors';
import NamePanelComponents from '../components/NamePanelComponents';
import { useGetEstadisticaQuery } from '../app/services/estadistica';
import { getQueryParam } from '../../src/utils/url-utils';
import { useLocation } from 'react-router-dom';
import { QUERY_PARAM_ESTADISTICA_ID } from '../../src/core/constantes';
export default function MdaPage() {
  const location = useLocation();
  // Extraer el id de la estadistica de la url
  const urlEstadisticaId = +getQueryParam(location, QUERY_PARAM_ESTADISTICA_ID);
  const { data: estadistica, isLoading } =
    useGetEstadisticaQuery(urlEstadisticaId);
  //Colores de componentess
  const colors: ColorsType = {
    '1': '#4cd4f3',
    '2': '#fe903a',
    '3': '#fd4d5e',
    '4': '#0183ad',
    '5': '#3c9326',
    '6': '#feb739',
  };
  if (isLoading) return <div>Cargando...</div>;
  return (
    <>
      <EstadisticasNav />
      <NamePanelComponents colors={colors} />
      <div className="flex sm:flex-col-reverse md:flex-row">
        <div style={{ width: '300px' }} className="bg-gray-100">
          <NabAside />
        </div>
        <div className="flex-1 overflow-hidden ">
          <EstadisticaVistaTabs estadistica={estadistica} />
        </div>
      </div>
    </>
  );
}
