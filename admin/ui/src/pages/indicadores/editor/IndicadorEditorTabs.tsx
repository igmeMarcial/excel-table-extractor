import React from 'react';
import { Tabs } from 'antd';
import IndicadorEditorTabFicha from './IndicadorEditorTabFicha';
import IndicadorEditorTabDatos from './IndicadorEditorTabDatos';
import IndicadorEditorTabPresentacion from './IndicadorEditorTabPresentacion';

interface TabItem {
  key: string;
  label: string;
  children: React.ReactNode;
}

interface IndicadorEditorTabsProps {
  onTabDataChange: (tab: string, values: any) => void; // el tipo de la función de cambio de datos de la pestaña
}

const IndicadorEditorTabs: React.FC<IndicadorEditorTabsProps> = ({ onTabDataChange }) => {
  const handleFichaChange = (values:any) => {
    onTabDataChange('ficha', values);
  };

  const items:TabItem[] = [
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
    console.info("tabs: " + key)
  };
  return <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />;
}

export default IndicadorEditorTabs;
