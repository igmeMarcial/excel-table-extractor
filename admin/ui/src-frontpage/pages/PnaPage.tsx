import VistaEstadisticaPna from '../views/VistaEstadisticaPna';
import EstadisticaPageLoader from './EstadisticaPageLoader';
export default function PnaPage() {
  return (
    <EstadisticaPageLoader
      view={VistaEstadisticaPna}
      marcoOdenador="pna"
    ></EstadisticaPageLoader>
  );
}
