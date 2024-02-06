import React from 'react';
import { Button } from 'antd';

function ConfiguracionBottomActions() {
  const handleClick = (e) => {
    console.log('Guerdado correctamente');
  };
  return (
    <div className="pl-12 bg-custom-grey py-2 flex space-x-4">
      <Button onClick={handleClick} type="primary ">
        Guardar
      </Button>
    </div>
  );
}

export default ConfiguracionBottomActions;
