import {
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  makeStyles,
} from '@fluentui/react-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { newPathUrl } from '../../src/utils/url-utils';
import { Estadistica } from '../types/Estadistica';
import BlockGrafico from '../../src/public/components/BlockGrafico';
import { BlockGraficoEstadisticaDatos } from '../../src/types/BlockGraficoEstadisticaDatos';
import BlockTabla from '../../src/public/components/BlockTabla';
import { BlockFichaTecnica } from '../../src/public/components/BlockFichaTecnica';
import { useEstadisticaDataViewParam } from '../../src/hooks/url-hooks';

const items = [
  { text: 'Gráfico', value: 'grafico' },
  { text: 'Datos', value: 'datos' },
  { text: 'Ficha técnica', value: 'ficha' },
];

const useStyles = makeStyles({
  item: {
    paddingLeft: '0',
    ':after': {
      left: '3px',
    },
    ':before': {
      left: '3px',
    },
  },
});

interface EstadisticaVistaTabsProps {
  estadistica: Estadistica;
}
const EstadisticaVistaTabs = ({ estadistica }: EstadisticaVistaTabsProps) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = useEstadisticaDataViewParam();
  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    const newPath = newPathUrl(location, 'tab', String(data.value));
    navigate(newPath);
  };
  const numeralNivel1 = +estadistica.marcoOrdenador?.numeral.split('.')[0];
  return (
    <div className="pl-6 pr-6">
      <TabList selectedValue={activeTab} onTabSelect={onTabSelect}>
        {items.map((item, index) => {
          return (
            <Tab
              key={item.value}
              value={item.value}
              className={index === 0 ? classes.item : ''}
            >
              {item.text}
            </Tab>
          );
        })}
      </TabList>
      <div className="my-4">
        {activeTab === 'grafico' && (
          <BlockGrafico
            estadistica={estadistica as BlockGraficoEstadisticaDatos}
            grafico={estadistica.graficos[0]}
          />
        )}
        {activeTab === 'datos' && (
          <BlockTabla
            estadistica={estadistica}
            contextoVisual={estadistica.marcoOrdenador.codigo}
            numeralNivel1={numeralNivel1}
          />
        )}
        {activeTab === 'ficha' && (
          <BlockFichaTecnica estadistica={estadistica} />
        )}
      </div>
    </div>
  );
};
export default EstadisticaVistaTabs;
