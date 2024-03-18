import NamePanel from '../components/NamePanel';
import NabAside from '../components/NabAside';
import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';
import EstadisticasNav from '../blocks/EstadisticasNav';

export default function NavegadorEstadisticas() {
  return (
    <>
      <EstadisticasNav />
      <NamePanel />
      <div className="flex">
        <div style={{ width: '300px' }}>
          <NabAside />
        </div>
        <div className="flex-1 overflow-hidden border border-red-400 border-solid">
          <EstadisticaVistaTabs />
        </div>
      </div>
    </>
  );
}
