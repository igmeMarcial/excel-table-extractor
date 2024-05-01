import { Field, Input, TextareaOnChangeData } from '@fluentui/react-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DT_GRAFICO_DECIMALES_DEFECTO } from '../../config/design-tokens';
import {
  selectGraficoFieldValue,
  setGraficoFieldValue,
} from '../../pages/indicadores/EstadisticaFormSlice';

interface LabelDecimalsEditorProps {
  chartIndex: number;
}

const LabelDecimalsEditor = ({ chartIndex }: LabelDecimalsEditorProps) => {
  const dispath = useAppDispatch();
  const fieldName = 'numeroDecimalesEtiquetas';

  let value =
    useAppSelector(selectGraficoFieldValue(chartIndex, fieldName)) || null;
  const handleChange = (e, data: TextareaOnChangeData) => {
    dispath(
      setGraficoFieldValue({
        index: chartIndex,
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
