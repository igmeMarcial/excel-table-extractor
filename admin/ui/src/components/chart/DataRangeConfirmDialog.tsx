import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Field,
  Input,
  FluentProvider,
  webLightTheme,
  makeStyles,
  InputOnChangeData,
} from '@fluentui/react-components';
import { Modal, Button } from 'antd';
import Datasheet from '../Datasheet';

const useStyles = makeStyles({
  rangeInput: {
    width: '94px',
  },
});

const DataRangeConfirmDialog = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const styles = useStyles();
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const onValuesRangeChage = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {};

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));
  const handleOk = () => {};
  const handleCancel = () => {};
  return (
    <Modal
      title="Confirmar rango de datos"
      open={isOpen}
      className=""
      onCancel={close}
      footer={[
        <Button disabled={true} key="submit" type="primary" onClick={handleOk}>
          Importar
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>,
      ]}
    >
      <FluentProvider theme={webLightTheme}>
        <div>Rangos</div>
        <div className="flex gap-4 my-4">
          <Field label="Valores">
            <Input
              type="text"
              name="rangoValores"
              className={styles.rangeInput}
              onChange={onValuesRangeChage}
              value="K13:k12"
            />
          </Field>
        </div>
        {/* <Datasheet data={data} chartDataRanges={chartDataRanges} /> */}
        {/* <Button appearance="subtle" onClick={() => close()}>
          Cerrar
        </Button> */}
      </FluentProvider>
    </Modal>
  );
});

export default DataRangeConfirmDialog;
