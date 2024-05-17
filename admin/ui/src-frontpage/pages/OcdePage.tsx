import VistaEstadisticaDefecto from '../views/VistaEstadisticaDefecto';
import EstadisticaPageLoader from './EstadisticaPageLoader';
export default function OcdePage() {
  return (
    <EstadisticaPageLoader
      view={VistaEstadisticaDefecto}
    ></EstadisticaPageLoader>
  );
}
