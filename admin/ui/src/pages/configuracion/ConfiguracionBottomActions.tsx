import React from 'react';
import { message, Button } from 'antd';
interface ConfiguracionBottomActionsProps {
  settingValues: any;
}

const ConfiguracionBottomActions: React.FC<ConfiguracionBottomActionsProps> = ({
  settingValues,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleClick = (e) => {
    if (settingValues) {
      messageApi.open({
        type: 'success',
        content: 'Guardado correctamente',
        style: {
          marginTop: '3vh',
          zIndex: 99,
        },
      });
    } else {
      console.error(
        'No se pueden guardar los valores porque settingValues no está definido.'
      );
    }
  };
  return (
    <div className="pl-12 bg-custom-grey py-2 flex space-x-4">
      {contextHolder}
      <Button disabled={!settingValues} onClick={handleClick} type="primary">
        Guardar
      </Button>
    </div>
  );
};

export default ConfiguracionBottomActions;
