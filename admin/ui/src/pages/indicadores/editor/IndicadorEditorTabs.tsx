import { Tabs } from 'antd';
import EstadisticaEditorTabFicha from './EstadisticaEditorTabFicha';
import EstadisticaEditorTabDatos from './EstadisticaEditorTabDatos';
import EstadisticaEditorTabPresentacion from './EstadisticaEditorTabPresentacion';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectActiveTab, setActiveTab } from '../EstadisticaFormSlice';
interface TabItem {
  key: string;
  label: string;
  children: React.ReactNode;
}

const IndicadorEditorTabs = () => {
  const activeTabKey = useAppSelector(selectActiveTab);
  const dispath = useAppDispatch();

  const items: TabItem[] = [
    {
      key: '1',
      label: 'Ficha',
      children: <EstadisticaEditorTabFicha />,
    },
    {
      key: '2',
      label: 'Datos',
      children: <EstadisticaEditorTabDatos />,
    },
    {
      key: '3',
      label: 'Presentación',
      children: <EstadisticaEditorTabPresentacion />,
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
