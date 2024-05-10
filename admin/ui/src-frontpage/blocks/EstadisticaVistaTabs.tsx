import {
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  makeStyles,
} from '@fluentui/react-components';
import FichaTecnica from '../components/FichaTecnica';
import Grafico from '../components/Grafico';
import TablaDatos from '../components/TablaDatos';
import { useLocation, useNavigate } from 'react-router-dom';
import { newPathUrl } from '../../src/utils/url-utils';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectActiveTabName, setActiveTabName } from '../app/AppSlice';

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

const EstadisticaVistaTabs = () => {
  const classes = useStyles();
  const selectedValue = useAppSelector(selectActiveTabName);
  const distpath = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    distpath(setActiveTabName(String(data.value)));
    const newPath = newPathUrl(location, 'tab', String(data.value));
    navigate(newPath);
  };
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
        {selectedValue === 'grafico' && <Grafico />}
        {selectedValue === 'datos' && <TablaDatos />}
        {selectedValue === 'ficha' && <FichaTecnica />}
      </div>
    </div>
  );
};
export default EstadisticaVistaTabs;
