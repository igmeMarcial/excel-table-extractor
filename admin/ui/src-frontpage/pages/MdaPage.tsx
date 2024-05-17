import VistaEstadisticaDefecto from '../views/VistaEstadisticaDefecto';
import EstadisticaPageLoader from './EstadisticaPageLoader';
export default function MdaPage() {
  return (
    <EstadisticaPageLoader
      view={VistaEstadisticaDefecto}
    ></EstadisticaPageLoader>
  );
}
