import VistaEstadisticaMdea from '../views/VistaEstadisticaMdea';
import EstadisticaPageLoader from './EstadisticaPageLoader';
export default function MdaPage() {
  return (
    <EstadisticaPageLoader
      view={VistaEstadisticaMdea}
      marcoOdenador="mdea"
    ></EstadisticaPageLoader>
  );
}
