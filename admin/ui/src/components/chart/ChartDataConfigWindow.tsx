import { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Field,
  FluentProvider,
  webLightTheme,
  RadioGroup,
  Radio,
} from '@fluentui/react-components';
import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectEstadisticaDatos,
  setGraficoDataRanges,
} from '../../pages/estadisticas/EstadisticaFormSlice';
import { decodeCellRange } from '../../utils/decodeCellRange';
import Datasheet from '../Datasheet';
import { ChartDataRanges } from '../../types/ChartDataRanges';
import { Orientation } from '../../types/Orientation';
import { ReferenciasTablaDatos } from '../../types/ReferenciasTablaDatos';
import { validateCellRange } from '../../utils/validateCellRange';
import CellRangeInput from './CellRangeInput';

interface ChartDataConfigWindowProps {
  chartId: number;
}

const ChartDataConfigWindow = forwardRef(
  ({ chartId }: ChartDataConfigWindowProps, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [valuesRangeInputValue, setValuesRangeInputValue] = useState('');
    const [categoriesRangeInputValue, setCategoriesRangeInputValue] =
      useState('');
    const [seriesRangeInputValue, setSeriesRangeInputValue] = useState('');
    const [chartDataRanges, setChartDataRanges] =
      useState<ChartDataRanges>(null);
    const [seriesOrientation, setSeriesOrientation] =
      useState<Orientation>(null);

    // Metodos expuestos
    const open = (referenciasTablaDatos: ReferenciasTablaDatos) => {
      setValuesRangeInputValue(referenciasTablaDatos.rangoValores);
      setCategoriesRangeInputValue(referenciasTablaDatos.rangoCategorias);
      setSeriesRangeInputValue(referenciasTablaDatos.rangoSeries);
      setSeriesOrientation(referenciasTablaDatos.orientacionSeries);
      setChartDataRanges({
        valuesRange: decodeCellRange(referenciasTablaDatos.rangoValores),
        categoriesRange: decodeCellRange(referenciasTablaDatos.rangoCategorias),
        seriesRange: decodeCellRange(referenciasTablaDatos.rangoSeries),
        seriesOrientation: referenciasTablaDatos.orientacionSeries,
      });
      setIsOpen(true);
    };
    const close = () => {
      setIsOpen(false);
    };
    const handleOnConfirm = () => {
      dispath(
        setGraficoDataRanges({
          graficoId: chartId,
          chartDataRanges: {
            ...chartDataRanges,
            seriesOrientation,
          },
        })
      );
      setIsOpen(false);
    };
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));
    const dispath = useAppDispatch();

    const data = useAppSelector(selectEstadisticaDatos);

    // Si no esta abierto no se muestra nada
    if (!isOpen) return <span></span>;
    const updateGraficoDataRange = (
      rangeName: keyof ChartDataRanges,
      encodedRange: string
    ) => {
      // Valid range
      if (validateCellRange(encodedRange)) {
        setChartDataRanges({
          ...chartDataRanges,
          [rangeName]: decodeCellRange(encodedRange),
        });
      }
    };
    const updateValuesDataRange = (range: string) => {
      setValuesRangeInputValue(range);
      updateGraficoDataRange('valuesRange', range);
    };
    const updateCategoriesDataRange = (range: string) => {
      setCategoriesRangeInputValue(range);
      updateGraficoDataRange('categoriesRange', range);
    };
    const updateSeriesDataRange = (range: string) => {
      setSeriesRangeInputValue(range);
      updateGraficoDataRange('seriesRange', range);
    };
    return (
      <Modal
        title="Configuracion de rango de datos"
        open={isOpen}
        className="bg-gray-400"
        onCancel={close}
        onOk={handleOnConfirm}
        width={960}
      >
        <FluentProvider theme={webLightTheme}>
          <div className="flex gap-4 my-4">
            <CellRangeInput
              label="Categorías"
              value={categoriesRangeInputValue}
              onChange={updateCategoriesDataRange}
            />
            <CellRangeInput
              label="Series"
              value={seriesRangeInputValue}
              onChange={updateSeriesDataRange}
            />
            <CellRangeInput
              label="Valores"
              value={valuesRangeInputValue}
              onChange={updateValuesDataRange}
            />
            <Field label="Orientación de las series">
              <RadioGroup
                value={seriesOrientation}
                onChange={(e, data) =>
                  setSeriesOrientation(data.value as Orientation)
                }
                layout="horizontal"
              >
                <Radio value="horizontal" label="Horizontal" />
                <Radio value="vertical" label="Vertical" />
              </RadioGroup>
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
