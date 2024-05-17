import { useGetEstadisticaQuery } from '../app/services/estadistica';
import { getQueryParam } from '../../src/utils/url-utils';
import { useLocation } from 'react-router-dom';
import { QUERY_PARAM_ESTADISTICA_ID } from '../../src/core/constantes';
interface EstadisticaPageLoaderProps {
  view: any;
}
export default function EstadisticaPageLoader({
  view: View,
}: Readonly<EstadisticaPageLoaderProps>) {
  const location = useLocation();
  // Extraer el id de la estadistica de la url
  const urlEstadisticaId = +getQueryParam(location, QUERY_PARAM_ESTADISTICA_ID);
  const {
    data: estadistica,
    isLoading,
    isError,
    error,
  } = useGetEstadisticaQuery(urlEstadisticaId);
  if (isLoading) return <div>Cargando...</div>;
  if (isError) {
    console.log(error);
    return <div>Error</div>;
  }
  if (!estadistica) {
    // Manejar el error 404 cuando la estadística no es encontrada
    return <div>error pagina no 404</div>;
  }
  // TODO: Add error handling
  return <View estadistica={estadistica}></View>;
}
