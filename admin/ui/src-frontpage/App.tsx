import ParamRoutes from '../src/ParamRoutes';
import ParamRoute from '../src/ParamRoute';

import { useAppDispatch } from './app/hooks';
import { useLocation } from 'react-router-dom';
import { getQueryParam } from '../src/utils/url-utils';
import { setEstadisticaIndicePath } from './app/AppSlice';
import { QUERY_PARAM_ESTADISTICA_INDICE_PATH } from '../src/core/constantes';
import { useGetIndiceQuery } from './app/services/estadistica';
import NavegadorEstadisticasAlt2 from './secctions/NavegadorEstadisticasAlt2';
import MdaPage from './pages/MdaPage';
import OdsPage from './pages/OdsPage';
import OcdePage from './pages/OcdePage';
import PnaPage from './pages/PnaPage';

function App() {
  const dispath = useAppDispatch();
  const location = useLocation();
  const indice = getQueryParam(location, QUERY_PARAM_ESTADISTICA_INDICE_PATH);

  if (indice) {
    dispath(setEstadisticaIndicePath(indice));
  }
  // Load indice
  useGetIndiceQuery(1);
  return (
    <ParamRoutes param="marcoOrdenador">
      <ParamRoute default element={<MdaPage />} />
      <ParamRoute value="mdea" element={<MdaPage />} />
      <ParamRoute value="ods" element={<OdsPage />} />
      <ParamRoute value="ocde" element={<OcdePage />} />
      <ParamRoute value="pna" element={<PnaPage />} />
      <ParamRoute value="vista2" element={<NavegadorEstadisticasAlt2 />} />
    </ParamRoutes>
  );
}

export default App;
