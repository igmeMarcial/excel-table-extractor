import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Anuarios from './pages/anuarios/Anuarios';
import Configuracion from './pages/configuracion/Configuracion';
import EditorIndicadores from './pages/EditorIndicadores';
import Indicadores from './pages/indicadores/Indicadores';
import Plantilla from './pages/plantilla/Plantilla';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Indicadores />}></Route>
      <Route path="/indicadores" element={<Indicadores />} />
      <Route path="/anuarios" element={<Anuarios />} />
      <Route path="/plantilla" element={<Plantilla />} />
      <Route path="/anuarios" element={<Configuracion />} />
      <Route path="/indicadores/editar" element={<EditorIndicadores />} />
    </Routes>
  );
}

export default App;
