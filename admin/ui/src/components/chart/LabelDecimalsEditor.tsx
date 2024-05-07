import { Field, Input, TextareaOnChangeData } from '@fluentui/react-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DT_GRAFICO_DECIMALES_DEFECTO } from '../../config/design-tokens';
import {
  selectGraficoFieldValue,
  setGraficoFieldValue,
} from '../../pages/estadisticas/EstadisticaFormSlice';

interface LabelDecimalsEditorProps {
  chartId: number;
}

const LabelDecimalsEditor = ({ chartId }: LabelDecimalsEditorProps) => {
  const dispath = useAppDispatch();
  const fieldName = 'numeroDecimalesEtiquetas';

  let value =
    useAppSelector(selectGraficoFieldValue(chartId, fieldName)) || null;
  const handleChange = (e, data: TextareaOnChangeData) => {
    dispath(
      setGraficoFieldValue({
        graficoId: chartId,
        field: fieldName,
        value: data.value,
      })
    );
  };
  return (
    <Field label="Número de decimales en etiquetas">
      <Input
        type="number"
        onChange={handleChange}
        value={String(value)}
        placeholder={DT_GRAFICO_DECIMALES_DEFECTO + ''}
        min="0"
        max="4"
      />
    </Field>
  );
};

export default LabelDecimalsEditor;
