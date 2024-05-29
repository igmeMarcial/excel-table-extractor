import EstadisticasPage from './pages/estadisticas/EstadisticasPage';
import AnuariosPage from './pages/anuarios/AnuariosPage';
import ParamRoutes from './ParamRoutes';
import ParamRoute from './ParamRoute';

import Dev from './pages/dev/Dev';

import EstadisticaEditorPage from './pages/estadisticas/editor/EstadisticaEditorPage';
import ConfiguracionPage from './pages/configuracion/ConfiguracionPage';
import ClasificadoresPage from './pages/clasificadores/ClasificadoresPage';

function App() {
  return (
    <ParamRoutes param="view">
      <ParamRoute default element={<EstadisticasPage />} />
      <ParamRoute value="indicadores" element={<EstadisticasPage />} />
      <ParamRoute value="anuarios" element={<AnuariosPage />} />
      <ParamRoute value="configuracion" element={<ConfiguracionPage />} />
      <ParamRoute value="dev" element={<Dev />} />
      <ParamRoute value="clasificadores" element={<ClasificadoresPage />} />
      <ParamRoute
        value="indicador-editor"
        element={<EstadisticaEditorPage />}
      />
    </ParamRoutes>
  );
}

export default App;
