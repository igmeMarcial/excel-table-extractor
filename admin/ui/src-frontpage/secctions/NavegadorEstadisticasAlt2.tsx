import NabAside from '../components/NabAside';
import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';
import EstadisticasNav from '../blocks/EstadisticasNav';
import { ColorsType } from '../types/Colors';
import NamePanelComponents from '../components/NamePanelComponents';

export default function NavegadorEstadisticasAlt2() {
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

      <div>
        <EstadisticaVistaTabs />
      </div>
    </>
  );
}
