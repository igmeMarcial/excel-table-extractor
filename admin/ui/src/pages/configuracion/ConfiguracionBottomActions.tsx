import React from 'react';
import { Button } from 'antd';
interface ConfiguracionBottomActionsProps{
  settingValues : any
}

const ConfiguracionBottomActions:React.FC<ConfiguracionBottomActionsProps>=({settingValues})=> {
  const handleClick = (e) => {
    if(settingValues){
       console.log("Guardando...");
       console.log(settingValues)
    }else{
      console.error("No se pueden guardar los valores porque settingValues no está definido.");
    }
  };
  return (
    <div className="pl-12 bg-custom-grey py-2 flex space-x-4">
      <Button disabled={!settingValues} onClick={handleClick} type="primary">
        Guardar
      </Button>
    </div>
  );
}

export default ConfiguracionBottomActions;
