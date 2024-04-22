import {
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
} from '@fluentui/react-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { newPathUrl } from '../../src/utils/url-utils';
import { selectMarcoOrdenadorSeleccionado } from '../app/AppSlice';
import { useAppSelector } from '../app/hooks';
import {
  MARCO_ORDENADOR_DEFECTO,
  QUERY_PARAM_MARCO_ORDENADOR,
} from '../../src/core/constantes';
import { useEffect } from 'react';

function SubNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeItem = useAppSelector(selectMarcoOrdenadorSeleccionado);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.has(QUERY_PARAM_MARCO_ORDENADOR)) {
      const loadPath = newPathUrl(
        location,
        QUERY_PARAM_MARCO_ORDENADOR,
        MARCO_ORDENADOR_DEFECTO
      );
      navigate(loadPath);
    }
  }, []);

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    const newPath = newPathUrl(
      location,
      QUERY_PARAM_MARCO_ORDENADOR,
      String(data.value)
    );
    navigate(newPath);
  };
  const items = [
    { text: 'MDEA', path: 'mdea' },
    { text: 'ODS', path: 'ods' },
    { text: 'OCDE', path: 'ocde' },
    {
      text: 'Política Nacional del Ambiente',
      path: 'pna',
    },
  ];
  return (
    <div className="bg-gray-200">
      <TabList selectedValue={activeItem} onTabSelect={onTabSelect}>
        {items.map((item) => {
          return (
            <Tab key={item.path} value={item.path}>
              {item.text}
            </Tab>
          );
        })}
      </TabList>
    </div>
  );
}

export default SubNavbar;
