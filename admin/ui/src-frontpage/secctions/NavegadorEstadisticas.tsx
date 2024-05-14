import NabAside from '../components/NabAside';
import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';
import EstadisticasNav from '../blocks/EstadisticasNav';
import { ColorsType } from '../types/Colors';
import NamePanelComponents from '../components/NamePanelComponents';
export default function NavegadorEstadisticas() {
  //Colores de componentes
  const colors: ColorsType = {
    '1': '#4cd4f3',
    '2': '#fe903a',
    '3': '#fd4d5e',
    '4': '#0183ad',
    '5': '#3c9326',
    '6': '#feb739',
  };

  return (
    <>
      <EstadisticasNav />
      <NamePanelComponents colors={colors} />
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
