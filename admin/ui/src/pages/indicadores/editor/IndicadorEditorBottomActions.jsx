import React, { forwardRef, useImperativeHandle } from 'react';
import { Button, Flex } from 'antd';

const IndicadorEditorBottomActions = forwardRef((props, ref) => {
  const { onClick } = props;

  return (
    <Flex gap="middle" className="pl-12 bg-custom-grey py-2">
      <Button onClick={onClick} type="primary">
        Registrar
      </Button>
      <Button>Cancelar</Button>
    </Flex>
  );
});
export default IndicadorEditorBottomActions;
