import ParamRoutes from '../src/ParamRoutes';
import ParamRoute from '../src/ParamRoute';

import NavegadorEstadisticas from './secctions/NavegadorEstadisticas';
import { useAppDispatch } from './app/hooks';
import { useLocation } from 'react-router-dom';
import { getQueryParam } from '../src/utils/url-utils';
import {
  setEstadisticaId,
  setEstadisticaIndicePath,
  setMarcoOrdenadorSeleccionado,
} from './app/AppSlice';
import {
  MARCO_ORDENADOR_DEFECTO,
  QUERY_PARAM_ESTADISTICA_ID,
  QUERY_PARAM_ESTADISTICA_INDICE_PATH,
  QUERY_PARAM_MARCO_ORDENADOR,
} from '../src/core/constantes';
import {
  useGetEstadisticaQuery,
  useGetIndiceQuery,
} from './app/services/estadistica';

function App() {
  const dispath = useAppDispatch();
  const location = useLocation();
  const indice = getQueryParam(location, QUERY_PARAM_ESTADISTICA_INDICE_PATH);
  // Marco ordenador seleccionado
  const marcoOrdenadorParam = getQueryParam(
    location,
    QUERY_PARAM_MARCO_ORDENADOR,
    MARCO_ORDENADOR_DEFECTO
  );
  dispath(setMarcoOrdenadorSeleccionado(marcoOrdenadorParam));
  // Set estadistica id
  const urlEstadisticaId =
    getQueryParam(location, QUERY_PARAM_ESTADISTICA_ID) || 1;
  if (indice) {
    dispath(setEstadisticaIndicePath(indice));
  }
  if (urlEstadisticaId) {
    dispath(setEstadisticaId(Number(urlEstadisticaId)));
    console.log('useGetEstadisticaQuery start');
    const { data } = useGetEstadisticaQuery(Number(urlEstadisticaId));
    console.log('useGetEstadisticaQuery data', data);
    console.log('useGetEstadisticaQuery end');
  }
  // Load indice
  useGetIndiceQuery(1);
  return (
    <ParamRoutes param="view">
      <ParamRoute default element={<NavegadorEstadisticas />} />
    </ParamRoutes>
  );
}

export default App;
