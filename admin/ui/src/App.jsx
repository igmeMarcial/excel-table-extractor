import React from 'react';

import Configuracion from './pages/configuracion/ConfiguracionPage';
import IndicadoresPage from './pages/indicadores/IndicadoresPage';
import PlantillasPage from './pages/plantillas/PlantillasPage';
import AnuariosPage from './pages/anuarios/AnuariosPage';
import ParamRoutes from './ParamRoutes';
import ParamRoute from './ParamRoute';
import Dev from './pages/dev/Dev';
import FichaPage from './pages/indicadores/ficha/FichaPage';
import DatosPage from './pages/indicadores/datos/DatosPage';

import IndicadorEditorPage from './pages/indicadores/editor/IndicadorEditorPage';
import ConfiguracionPage from './pages/configuracion/ConfiguracionPage';

function App() {
  return (
    <ParamRoutes param="tab">
      <ParamRoute default element={<IndicadoresPage />} />
      <ParamRoute value="indicadores" element={<IndicadoresPage />} />
      <ParamRoute value="anuarios" element={<AnuariosPage />} />
      <ParamRoute value="plantillas" element={<PlantillasPage />} />
      <ParamRoute value="configuracion" element={<ConfiguracionPage />} />
      <ParamRoute value="dev" element={<Dev />} />
      <ParamRoute
        value="indicadores-editor"
        element={<IndicadorEditorPage />}
      />
      <ParamRoute value="indicadores/ficha" element={<FichaPage />} />
      <ParamRoute value="indicadores/datos" element={<DatosPage />} />
    </ParamRoutes>
  );
}

export default App;
