import React from 'react';
import { Tabs } from 'antd';
import IndicadorEditorTabFicha from './IndicadorEditorTabFicha';
import IndicadorEditorTabDatos from './IndicadorEditorTabDatos';
import IndicadorEditorTabPresentacion from './IndicadorEditorTabPresentacion';

const items = [
  {
    key: '1',
    label: 'Ficha',
    children: <IndicadorEditorTabFicha />,
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

function IndicadorEditorTabs() {
  const onChange = (key) => {
    console.log(key);
  };
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}

export default IndicadorEditorTabs;
