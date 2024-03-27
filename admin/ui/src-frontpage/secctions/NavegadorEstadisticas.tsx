import NamePanel from '../components/NamePanel';
import NabAside from '../components/NabAside';
import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';
import EstadisticasNav from '../blocks/EstadisticasNav';

export default function NavegadorEstadisticas() {
  return (
    <>
      <EstadisticasNav />
      <NamePanel />
      <div className="flex sm:flex-col-reverse md:flex-row">
        <div style={{ width: '300px' }} className="bg-gray-100">
          <NabAside />
        </div>
        <div className="flex-1 overflow-hidden ">
          <EstadisticaVistaTabs />
        </div>
      </div>
    </>
  );
}
