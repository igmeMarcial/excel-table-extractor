import { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Field,
  Input,
  Button,
  FluentProvider,
  webLightTheme,
  makeStyles,
  InputOnChangeData,
} from '@fluentui/react-components';
import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  selectEstadisticaData,
  selectGraficoFieldValue,
  setGraficoFieldValue,
} from '../../EstadisticaFormSlice';
import Datasheet, { ChartDataRanges } from '../../../../components/Datasheet';
import { decodeCellRange } from '../../../../utils/decodeCellRange';

const useStyles = makeStyles({
  rangeInput: {
    width: '94px',
  },
});

interface GraficoSeriesConfigWindowProps {
  chartIndex: number;
}
const GraficoSeriesConfigWindow = forwardRef(
  ({ chartIndex }: GraficoSeriesConfigWindowProps, ref) => {
    const dispath = useAppDispatch();
    const styles = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const data = useAppSelector(selectEstadisticaData);
    let referencias = useAppSelector(
      selectGraficoFieldValue(chartIndex, 'referenciasTablaDatos')
    );
    const chartDataRanges: ChartDataRanges = {
      valuesRange: decodeCellRange(referencias.rangoValores),
      categoriesRange: decodeCellRange(referencias.rangoCategorias),
      seriesRange: decodeCellRange(referencias.rangoSeries),
    };
    // Metodos expuestos
    const open = () => {
      setIsOpen(true);
    };
    const close = () => {
      setIsOpen(false);
    };
    const onValuesRangeChage = (
      e: React.ChangeEvent<HTMLInputElement>,
      data: InputOnChangeData
    ) => {
      console.log(e.target.name, data.value, e.target.value);
      dispath(
        setGraficoFieldValue({
          index: chartIndex,
          field: 'referenciasTablaDatos',
          value: { ...referencias, [e.target.name]: data.value },
        })
      );
    };
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    return (
      <Modal
        title="Configuración de series"
        open={isOpen}
        className="bg-gray-400"
        onCancel={close}
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
          <Datasheet data={data} chartDataRanges={chartDataRanges} />
          <Button appearance="subtle" onClick={() => close()}>
            Cerrar
          </Button>
        </FluentProvider>
      </Modal>
    );
  }
);

export default GraficoSeriesConfigWindow;
