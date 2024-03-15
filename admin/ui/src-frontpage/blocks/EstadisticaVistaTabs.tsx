import {
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
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

export default function EstadisticaVistaTabs() {
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
    <div className="pl-6">
      <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
        {items.map((item) => {
          return (
            <Tab key={item.value} value={item.value}>
              {item.text}
            </Tab>
          );
        })}
      </TabList>
      <div>
        {selectedValue === 'grafico' && <Grafico />}
        {selectedValue === 'datos' && <TablaDatos />}
        {selectedValue === 'ficha' && <FichaTecnica />}
      </div>
    </div>
  );
}
