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
        <div style={{ maxWidth: '300px' }}>
          <NabAside />
        </div>
        <EstadisticaVistaTabs />
      </div>
    </>
  );
}
