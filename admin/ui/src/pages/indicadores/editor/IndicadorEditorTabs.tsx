import React from 'react';
import { Tabs } from 'antd';
import IndicadorEditorTabFicha from './IndicadorEditorTabFicha';
import IndicadorEditorTabDatos from './IndicadorEditorTabDatos';
import IndicadorEditorTabPresentacion from './IndicadorEditorTabPresentacion';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectActiveTab, setActiveTab } from '../EstadisticaFormSlice';
interface TabItem {
  key: string;
  label: string;
  children: React.ReactNode;
}

const IndicadorEditorTabs: React.FC = () => {
  const activeTabKey = useAppSelector(selectActiveTab);
  const dispath = useAppDispatch();

  const items: TabItem[] = [
    {
      key: '1',
      label: 'Ficha',
      children: <IndicadorEditorTabFicha />,
    },
    {
      key: '2',
      label: 'Datos',
      children: <IndicadorEditorTabDatos/>,
    },
    {
      key: '3',
      label: 'Presentación',
      children: <IndicadorEditorTabPresentacion/>,
    },
  ];
  const onChangeTab = (key) => {
    dispath(setActiveTab(key));
  };
  return (
    <Tabs
      activeKey={activeTabKey}
      defaultActiveKey="1"
      items={items}
      onChange={onChangeTab}
    />
  );
};

export default IndicadorEditorTabs;
