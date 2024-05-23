import {
  useGetEstadisticaQuery,
  useGetIndiceEstadisticasQuery,
} from '../app/services/estadistica';
import { getQueryParam } from '../../src/utils/url-utils';
import { useLocation } from 'react-router-dom';
import { QUERY_PARAM_ESTADISTICA_ID } from '../../src/core/constantes';
import Status500Page from './Status500Page';
import { CodigoMarcoOrdenador } from '../../src/types/CodigoMarcoOrdenador';
import { VistaEstadisticaProps } from '../types/VistaEstadisticaProps';
import { IndiceEstadisticas } from '../../src/core/IndiceEstadisticas';
interface EstadisticaPageLoaderProps {
  view: React.ComponentType<VistaEstadisticaProps>;
  marcoOdenador: CodigoMarcoOrdenador;
}
export default function EstadisticaPageLoader({
  view: View,
  marcoOdenador,
}: Readonly<EstadisticaPageLoaderProps>) {
  const location = useLocation();
  // Extraer el id de la estadistica de la url
  const urlEstadisticaId = +getQueryParam(
    location,
    QUERY_PARAM_ESTADISTICA_ID,
    '1'
  );
  // Cargar estadística
  const {
    data: estadistica,
    isLoading: isLoadingEstadistica,
    isError: isErrorEstadistica,
    error: errorEstadistica,
  } = useGetEstadisticaQuery(urlEstadisticaId);
  // Cargar indice de estadísticas
  const {
    data: indiceEstadisticas,
    isLoading: isLoadingIndice,
    isError: isErrorIndice,
    error: errorIndice,
  } = useGetIndiceEstadisticasQuery(marcoOdenador);

  // Cargando
  if (isLoadingEstadistica || isLoadingIndice) {
    return <div>Cargando...</div>;
  }
  //
  if (isErrorEstadistica || isErrorIndice) {
    console.log('Error estadistica', errorEstadistica);
    console.log('Error indice', errorIndice);
    return <Status500Page />;
  }

  if (estadistica && indiceEstadisticas) {
    return (
      <View
        estadistica={estadistica}
        indiceEstadisticas={new IndiceEstadisticas(indiceEstadisticas)}
      ></View>
    );
  }
  if (!estadistica) {
    return <div>Estadistica no encotrado</div>;
  }
  // Default
  return <div>Indice estadistico no encontrado</div>;
}
