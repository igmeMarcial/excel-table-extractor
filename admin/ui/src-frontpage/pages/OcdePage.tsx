import VistaEstadisticaOcde from '../views/VistaEstadisticaOcde';
import EstadisticaPageLoader from './EstadisticaPageLoader';
export default function OcdePage() {
  return (
    <EstadisticaPageLoader
      view={VistaEstadisticaOcde}
      marcoOdenador="ocde"
    ></EstadisticaPageLoader>
  );
}
