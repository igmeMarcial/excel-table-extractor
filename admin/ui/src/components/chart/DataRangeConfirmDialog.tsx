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
import { Cell } from '../../types/Cell';
import { CellRange } from '../../types/CellRange';
import { decodeCellRange } from '../../utils/decodeCellRange';
import { encodeCellRange } from '../../utils/encodeCellRange';

const useStyles = makeStyles({
  rangeInput: {
    width: '94px',
  },
});
interface DataRangeConfirmDialogDataInput {
  data: Cell[][];
  dataSelectionRange: CellRange;
}
const DataRangeConfirmDialog = forwardRef((props, ref) => {
  const [range, setRange] = useState('');
  const [data, setData] = useState([]);
  const [dataSelectionRange, setDataSelectionRange] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const styles = useStyles();
  const open = ({
    data,
    dataSelectionRange,
  }: DataRangeConfirmDialogDataInput) => {
    setData(data);
    setDataSelectionRange(dataSelectionRange);
    setRange(encodeCellRange(dataSelectionRange));
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const onRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    const range = data.value;
    // TODO: Implementar validación de rango
    setRange(range);
    setDataSelectionRange(decodeCellRange(range));
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));
  const handleOk = () => {};
  return (
    <Modal
      title="Confirmar rango de datos"
      open={isOpen}
      className=""
      onCancel={close}
      footer={[
        <Button disabled={true} key="submit" type="primary" onClick={handleOk}>
          Confirmar
        </Button>,
        <Button key="back" onClick={close}>
          Cancelar
        </Button>,
      ]}
    >
      <FluentProvider theme={webLightTheme}>
        <div className="flex gap-4 my-4">
          <Field label="Rango de datos">
            <Input
              type="text"
              name="rangoValores"
              className={styles.rangeInput}
              onChange={onRangeChange}
              value={range}
            />
          </Field>
        </div>
        <Datasheet data={data} dataSelectionRange={dataSelectionRange} />
      </FluentProvider>
    </Modal>
  );
});

export default DataRangeConfirmDialog;
