import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import ConfiguracionMain from './ConfiguracionMain';
import ConfiguracionBottomActions from './ConfiguracionBottomActions';

const ConfiguracionPage: React.FC = ()=> {
  const [ settingValue,setSettingValue] = useState(null);


  const handleSettingChange=(values:any)=>{
    setSettingValue(values)
  }


  return (
    <MainLayout>
      <ConfiguracionMain onSettingChange={handleSettingChange}/>
      <ConfiguracionBottomActions  settingValues={settingValue}/>
    </MainLayout>
  );
}

export default ConfiguracionPage;
