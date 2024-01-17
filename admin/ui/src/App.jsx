import React from 'react';

import Anuarios from './pages/anuarios/Anuarios';
import Configuracion from './pages/configuracion/Configuracion';
import EditorIndicadores from './pages/EditorIndicadores';
import Indicadores from './pages/indicadores/Indicadores';
import Plantillas from './pages/plantillas/Plantillas';
import ParamRoutes from './ParamRoutes';
import ParamRoute from './ParamRoute';

function App() {
  return (
    <ParamRoutes param="tab">
      <ParamRoute default element={<Indicadores />} />
      <ParamRoute value="indicadores" element={<Indicadores />} />
      <ParamRoute value="anuarios" element={<Anuarios />} />
      <ParamRoute value="plantillas" element={<Plantillas />} />
      <ParamRoute value="indicadores/editar" element={<EditorIndicadores />} />
      <ParamRoute value="configuracion" element={<Configuracion />} />
    </ParamRoutes>
  );
}

export default App;
