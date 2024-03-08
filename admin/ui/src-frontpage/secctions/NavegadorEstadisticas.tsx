import Title from '../components/Title';
import NamePanel from '../components/NamePanel';
import NabAside from '../components/NabAside';
import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';
import EstadisticasNav from '../blocks/EstadisticasNav';

export default function NavegadorEstadisticas() {
  return (
    <>
      <Title />
      <EstadisticasNav />
      <NamePanel />
      <div className="flex">
        <div className="w-3/12">
          <NabAside />
        </div>
        <EstadisticaVistaTabs />
      </div>
    </>
  );
}
