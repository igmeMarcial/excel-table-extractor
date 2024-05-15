import ParamRoutes from '../src/ParamRoutes';
import ParamRoute from '../src/ParamRoute';

import { useAppDispatch } from './app/hooks';
import { useLocation } from 'react-router-dom';
import { getQueryParam } from '../src/utils/url-utils';
import {
  setEstadisticaIndicePath,
  setMarcoOrdenadorSeleccionado,
} from './app/AppSlice';
import {
  MARCO_ORDENADOR_DEFECTO,
  QUERY_PARAM_ESTADISTICA_INDICE_PATH,
  QUERY_PARAM_MARCO_ORDENADOR,
} from '../src/core/constantes';
import { useGetIndiceQuery } from './app/services/estadistica';
import NavegadorEstadisticasAlt2 from './secctions/NavegadorEstadisticasAlt2';
import MdaPage from './pages/MdaPage';

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
  if (indice) {
    dispath(setEstadisticaIndicePath(indice));
  }
  // Load indice
  useGetIndiceQuery(1);
  return (
    <ParamRoutes param="view">
      <ParamRoute default element={<MdaPage />} />
      <ParamRoute value="vista2" element={<NavegadorEstadisticasAlt2 />} />
    </ParamRoutes>
  );
}

export default App;
