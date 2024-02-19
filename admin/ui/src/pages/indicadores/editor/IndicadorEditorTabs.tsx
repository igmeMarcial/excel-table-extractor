import React, { useEffect, useState } from 'react';
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
  onTabDataChange: (tab: string, values: any) => void; 
  tableData:any;
  indicatorData:any;
  tabActiveKey: string;
  setTabActiveKey: (newKey: string) => void;

}
const IndicadorEditorTabs: React.FC<IndicadorEditorTabsProps> = ({ onTabDataChange, tableData,indicatorData,tabActiveKey,setTabActiveKey }) => {
  const [activeTabKey, setActiveTabKey] = useState(tabActiveKey);
  const handleFichaChange = (values:any) => {
    onTabDataChange('ficha', values);
  };
  const handleDatosChange=(values:any)=>{
    onTabDataChange('datos',values)
  }
   useEffect(() => {
    if(activeTabKey !== tabActiveKey){
      setActiveTabKey(tabActiveKey)
    }
  }, [tabActiveKey]);
  const items:TabItem[] = [
    {
      key: '1',
      label: 'Ficha',
      children: <IndicadorEditorTabFicha  onChange={handleFichaChange} indicatorData={indicatorData}/>,
    },
    {
      key: '2',
      label: 'Datos',
      children: <IndicadorEditorTabDatos onChange={handleDatosChange} tableData={tableData}/>,
    },
    {
      key: '3',
      label: 'Presentación',
      children: <IndicadorEditorTabPresentacion tableData={tableData} />,
    },
  ];
  const onChangeTab = (key) => {
   setActiveTabKey(key)
   setTabActiveKey(key)
  };
  return <Tabs  activeKey={activeTabKey} defaultActiveKey="1" items={items} onChange={onChangeTab} />;
}

export default IndicadorEditorTabs;
