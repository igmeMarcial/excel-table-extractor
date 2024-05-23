import ParamRoutes from '../src/ParamRoutes';
import ParamRoute from '../src/ParamRoute';

import NavegadorEstadisticasAlt2 from './secctions/NavegadorEstadisticasAlt2';
import MdaPage from './pages/MdaPage';
import OdsPage from './pages/OdsPage';
import OcdePage from './pages/OcdePage';
import PnaPage from './pages/PnaPage';

function App() {
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
