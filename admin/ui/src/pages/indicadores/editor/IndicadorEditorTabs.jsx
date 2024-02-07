import React, { useRef } from 'react';
import { Tabs } from 'antd';
import IndicadorEditorTabFicha from './IndicadorEditorTabFicha';
import IndicadorEditorTabDatos from './IndicadorEditorTabDatos';
import IndicadorEditorTabPresentacion from './IndicadorEditorTabPresentacion';

function IndicadorEditorTabs({ onTabDataChange }) {
  const handleFichaChange = (values) => {
    onTabDataChange('ficha', values);
  };

  const items = [
    {
      key: '1',
      label: 'Ficha',
      children: <IndicadorEditorTabFicha onChange={handleFichaChange} />,
    },
    {
      key: '2',
      label: 'Datos',
      children: <IndicadorEditorTabDatos />,
    },
    {
      key: '3',
      label: 'Presentación',
      children: <IndicadorEditorTabPresentacion />,
    },
  ];

  const onChangeTab = (key) => {
    // console.log(key);
  };
  return <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />;
}

export default IndicadorEditorTabs;
