import {
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
} from '@fluentui/react-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { newPathUrl } from '../../src/utils/url-utils';
import { QUERY_PARAM_MARCO_ORDENADOR } from '../../src/core/constantes';
import { useMarcoOrdenadorParam } from '../../src/hooks/url-hooks';

function MarcoOrdenadorNav() {
  const navigate = useNavigate();
  const location = useLocation();
  // Extraer el marco ordenador de la url
  const activeItem = useMarcoOrdenadorParam();

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
    { text: 'PNA', path: 'pna' },
    { text: 'ODS', path: 'ods' },
    { text: 'OCDE', path: 'ocde' },
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

export default MarcoOrdenadorNav;
