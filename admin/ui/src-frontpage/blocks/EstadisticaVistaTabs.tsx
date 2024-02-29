import {
  TabList,
  Tab,
  TabValue,
  SelectTabEvent,
  SelectTabData,
} from '@fluentui/react-components';
import { useState } from 'react';
import FichaTecnica from '../components/FichaTecnica';
import Grafico from '../components/Grafico';
import TablaDatos from '../components/TablaDatos';

const items = [
  { text: 'Gráfico', value: 'grafico' },
  { text: 'Datos', value: 'datos' },
  { text: 'Ficha técnica', value: 'ficha' },
];

export default function EstadisticaVistaTabs() {
  const [selectedValue, setSelectedValue] = useState<TabValue>('grafico');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };
  return (
    <div>
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
