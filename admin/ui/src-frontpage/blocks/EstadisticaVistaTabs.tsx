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
import { useLocation, useNavigate } from 'react-router-dom';
import { getPathResourceId, newPathUrl } from '../../src/utils/url-utils';
import { useGetEstadisticaQuery } from '../app/services/estadistica';
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

  const navigate = useNavigate()
  const location = useLocation();
  const resourceId = getPathResourceId(location);

  // Get data from the API
  if (resourceId) useGetEstadisticaQuery(+resourceId);

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    distpath(setActiveTabName(String(data.value)));
     const newPath = newPathUrl(location, 'tab', String(data.value));
     navigate(newPath)

  };
  return (
    <div className="w-full">
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
