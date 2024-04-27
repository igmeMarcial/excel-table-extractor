import { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Field,
  Input,
  FluentProvider,
  webLightTheme,
  makeStyles,
  InputOnChangeData,
} from '@fluentui/react-components';
import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectEstadisticaDatos,
  selectGraficoFieldValue,
  setGraficoFieldValue,
} from '../../pages/indicadores/EstadisticaFormSlice';
import { decodeCellRange } from '../../utils/decodeCellRange';
import Datasheet, { ChartDataRanges } from '../Datasheet';

const useStyles = makeStyles({
  rangeInput: {
    width: '94px',
  },
});

interface ChartDataConfigWindowProps {
  chartIndex: number;
}

const ChartDataConfigWindow = forwardRef(
  ({ chartIndex }: ChartDataConfigWindowProps, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    // Metodos expuestos
    const open = () => {
      setIsOpen(true);
    };
    const close = () => {
      setIsOpen(false);
    };
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));
    const dispath = useAppDispatch();
    const styles = useStyles();

    const data = useAppSelector(selectEstadisticaDatos);
    let referencias = useAppSelector(
      selectGraficoFieldValue(chartIndex, 'referenciasTablaDatos')
    );
    const onValuesRangeChage = (
      e: React.ChangeEvent<HTMLInputElement>,
      data: InputOnChangeData
    ) => {
      dispath(
        setGraficoFieldValue({
          index: chartIndex,
          field: 'referenciasTablaDatos',
          value: { ...referencias, [e.target.name]: data.value },
        })
      );
    };
    // Si no esta abierto no se muestra nada
    if (!isOpen) return <span></span>;
    const chartDataRanges: ChartDataRanges = {
      valuesRange: decodeCellRange(referencias.rangoValores),
      categoriesRange: decodeCellRange(referencias.rangoCategorias),
      seriesRange: decodeCellRange(referencias.rangoSeries),
    };

    return (
      <Modal
        title="Configuracion de rango de datoss"
        open={isOpen}
        className="bg-gray-400"
        onCancel={close}
      >
        <FluentProvider theme={webLightTheme}>
          <div className="flex gap-4 my-4">
            <Field label="Valores">
              <Input
                type="text"
                name="rangoValores"
                className={styles.rangeInput}
                onChange={onValuesRangeChage}
                value={referencias.rangoValores}
              />
            </Field>
            <Field label="Categorías">
              <Input
                type="text"
                name="rangoCategorias"
                className={styles.rangeInput}
                onChange={onValuesRangeChage}
                value={referencias.rangoCategorias}
              />
            </Field>
            <Field label="Series">
              <Input
                type="text"
                name="rangoSeries"
                className={styles.rangeInput}
                onChange={onValuesRangeChage}
                value={referencias.rangoSeries}
              />
            </Field>
          </div>
          <Datasheet
            data={data}
            chartDataRanges={chartDataRanges}
            style={{ maxHeight: '400px' }}
          />
        </FluentProvider>
      </Modal>
    );
  }
);

export default ChartDataConfigWindow;
