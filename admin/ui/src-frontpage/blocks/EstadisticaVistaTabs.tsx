import {
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  makeStyles,
} from '@fluentui/react-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { newPathUrl } from '../../src/utils/url-utils';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectActiveTabName,
  selectEstadisticaMarcoOrdenador,
  setActiveTabName,
} from '../app/AppSlice';
import { Estadistica } from '../types/Estadistica';
import BlockGrafico from '../../src/public/components/BlockGrafico';
import { BlockGraficoEstadisticaDatos } from '../../src/types/BlockGraficoEstadisticaDatos';
import BlockTabla from '../../src/public/components/BlockTabla';
import { BlockFichaTecnica } from '../../src/public/components/BlockFichaTecnica';

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
  const selectedValue = useAppSelector(selectActiveTabName);
  const marcoOrdenador =
    useAppSelector(selectEstadisticaMarcoOrdenador) || null;
  const distpath = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    distpath(setActiveTabName(String(data.value)));
    const newPath = newPathUrl(location, 'tab', String(data.value));
    navigate(newPath);
  };
  const numeralNivel1 = +marcoOrdenador?.numeral.split('.')[0];
  return (
    <div className="pl-6 pr-6">
      <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
        {items.map((item, index) => {
          return (
            <Tab
              key={item.value}
              value={item.value}
              // style={index === 0 ? { paddingLeft: 0 } : {}}
              className={index === 0 ? classes.item : ''}
            >
              {item.text}
            </Tab>
          );
        })}
      </TabList>
      <div className="my-4">
        {selectedValue === 'grafico' && (
          <BlockGrafico
            estadistica={estadistica as BlockGraficoEstadisticaDatos}
            grafico={estadistica.graficos[0]}
          />
        )}
        {selectedValue === 'datos' && (
          <BlockTabla
            estadistica={estadistica}
            contextoVisual={marcoOrdenador.codigo}
            numeralNivel1={numeralNivel1}
          />
        )}
        {selectedValue === 'ficha' && (
          <BlockFichaTecnica estadistica={estadistica} />
        )}
      </div>
    </div>
  );
};
export default EstadisticaVistaTabs;
