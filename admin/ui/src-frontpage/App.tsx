import ParamRoutes from '../src/ParamRoutes';
import ParamRoute from '../src/ParamRoute';

import EstadisticaVistaTabs from './blocks/EstadisticaVistaTabs';

function App() {
  return (
    <ParamRoutes param="view">
      <ParamRoute default element={<EstadisticaVistaTabs />} />
    </ParamRoutes>
  );
}

export default App;
