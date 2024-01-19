import React from 'react';

import Anuarios from './pages/anuarios/Anuarios';
import Configuracion from './pages/configuracion/Configuracion';
import EditorIndicadores from './pages/EditorIndicadores';
import IndicadoresPage from './pages/indicadores/IndicadoresPage';
import Plantillas from './pages/plantillas/Plantillas';
import ParamRoutes from './ParamRoutes';
import ParamRoute from './ParamRoute';

function App() {
  return (
    <ParamRoutes param="tab">
      <ParamRoute default element={<IndicadoresPage />} />
      <ParamRoute value="indicadores" element={<IndicadoresPage />} />
      <ParamRoute value="anuarios" element={<Anuarios />} />
      <ParamRoute value="plantillas" element={<Plantillas />} />
      <ParamRoute value="indicadores/editar" element={<EditorIndicadores />} />
      <ParamRoute value="configuracion" element={<Configuracion />} />
    </ParamRoutes>
  );
}

export default App;
