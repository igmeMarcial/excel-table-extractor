import ParamRoutes from '../src/ParamRoutes';
import ParamRoute from '../src/ParamRoute';

import NavegadorEstadisticas from './secctions/NavegadorEstadisticas';

function App() {
  return (
    <ParamRoutes param="view">
      <ParamRoute default element={<NavegadorEstadisticas />} />
    </ParamRoutes>
  );
}

export default App;
