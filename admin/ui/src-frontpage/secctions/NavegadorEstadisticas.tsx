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
      <div className="flex gap-6 border border-green-300 border-solid">
        <div className="w-1/3">
          <NabAside />
        </div>
        <EstadisticaVistaTabs />
      </div>
    </>
  );
}
