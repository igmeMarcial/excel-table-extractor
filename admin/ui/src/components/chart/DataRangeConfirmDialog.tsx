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
  const [isValidRange, setIsValidRange] = useState<boolean>(false);
  const styles = useStyles();
  const open = ({
    data,
    dataSelectionRange,
  }: DataRangeConfirmDialogDataInput) => {
    setData(data);
    setDataSelectionRange(dataSelectionRange);
    setRange(encodeCellRange(dataSelectionRange));
    setIsOpen(true);
    setIsValidRange(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  // Función para validar el rango
  const validarRango = (range) => {
    // Expresión regular para validar el formato A4:Y3
    const regex = /^[A-Z]+[1-9]+\d*:[A-Z]+[1-9]+\d*$/;
    if (!regex.test(range)) {
      return false;
    }
    // Obtener las coordenadas de ambas celdas en el rango
    const [coordA, coordB] = range.split(':');
    const filaA = parseInt(coordA.match(/\d+$/)[0]);
    const filaB = parseInt(coordB.match(/\d+$/)[0]);
    // Verificar que la primera fila sea menor o igual que la segunda fila
    return filaA <= filaB;
  };
  const onRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    const range = data.value.toUpperCase();

    setRange(range);
    const isValid = validarRango(range);
    setIsValidRange(isValid);
    setDataSelectionRange(decodeCellRange(range));
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));
  const handleOk = () => {
    setIsOpen(false);
    console.log('el rango confimrado es: ' + range);
  };
  return (
    <Modal
      title="Confirmar rango de datos"
      open={isOpen}
      className="w-full"
      onCancel={close}
      footer={[
        <Button
          disabled={!isValidRange}
          key="submit"
          type="primary"
          onClick={handleOk}
        >
          Confirmar
        </Button>,
        <Button key="back" onClick={close}>
          Cancelar
        </Button>,
      ]}
    >
      <FluentProvider theme={webLightTheme}>
        <div className="flex gap-4 my-4">
          <Field
            label="Rango de datos"
            validationState={!isValidRange ? 'error' : 'none'}
            validationMessage={!isValidRange ? 'Rango no valido' : ''}
          >
            <Input
              placeholder="A4:K28"
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
