import { Field, Input, TextareaOnChangeData } from '@fluentui/react-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
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
  let value = useAppSelector(selectGraficoFieldValue(chartIndex, fieldName));
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
      <Input type="number" onChange={handleChange} value={value} min="0" />
    </Field>
  );
};

export default LabelDecimalsEditor;
