import React from 'react';

import Configuracion from './pages/configuracion/Configuracion';
import IndicadoresPage from './pages/indicadores/IndicadoresPage';
import PlantillasPage from './pages/plantillas/PlantillasPage';
import AnuariosPage from './pages/anuarios/AnuariosPage';
import ParamRoutes from './ParamRoutes';
import ParamRoute from './ParamRoute';
import EditorIndicadores from './pages/indicadores/EditorIndicadores';
import Dev from './pages/dev/Dev';
import FichaPage from './pages/indicadores/ficha/FichaPage';
import DatosPage from './pages/indicadores/datos/DatosPage';
import PresentacionPage from './pages/indicadores/presentacion/PresentacionPage';

function App() {
  return (
    <ParamRoutes param="tab">
      <ParamRoute default element={<IndicadoresPage />} />
      <ParamRoute value="indicadores" element={<IndicadoresPage />} />
      <ParamRoute value="anuarios" element={<AnuariosPage />} />
      <ParamRoute value="plantillas" element={<PlantillasPage />} />
      <ParamRoute value="configuracion" element={<Configuracion />} />
      <ParamRoute value="dev" element={<Dev />} />
      <ParamRoute value="indicadores/editar" element={<EditorIndicadores />} />
      <ParamRoute value="indicadores/ficha" element={<FichaPage />} />
      <ParamRoute value="indicadores/datos" element={<DatosPage />} />
      <ParamRoute
        value="indicadores/presentacion"
        element={<PresentacionPage />}
      />
    </ParamRoutes>
  );
}

export default App;
