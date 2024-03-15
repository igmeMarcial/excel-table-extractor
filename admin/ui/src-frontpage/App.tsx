import ParamRoutes from '../src/ParamRoutes';
import ParamRoute from '../src/ParamRoute';

import NavegadorEstadisticas from './secctions/NavegadorEstadisticas';
import { useAppDispatch } from './app/hooks';
import { useLocation } from 'react-router-dom';
import { getQueryParam } from '../src/utils/url-utils';
import { setEstadisticaId, setEstadisticaIndicePath } from './app/AppSlice';
import {
  QUERY_PARAM_ESTADISTICA_ID,
  QUERY_PARAM_ESTADISTICA_INDICE_PATH,
} from './core/constantes';
import { useGetEstadisticaQuery } from './app/services/estadistica';

function App() {
  const dispath = useAppDispatch();
  const location = useLocation();
  const indice = getQueryParam(location, QUERY_PARAM_ESTADISTICA_INDICE_PATH);
  const estadisticaId =
    getQueryParam(location, QUERY_PARAM_ESTADISTICA_ID) || 1;
  if (indice) {
    dispath(setEstadisticaIndicePath(indice));
  }
  if (estadisticaId) {
    dispath(setEstadisticaId(Number(estadisticaId)));
    useGetEstadisticaQuery(Number(estadisticaId));
  }
  return (
    <ParamRoutes param="view">
      <ParamRoute default element={<NavegadorEstadisticas />} />
    </ParamRoutes>
  );
}

export default App;
