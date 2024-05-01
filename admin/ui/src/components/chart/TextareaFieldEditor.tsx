import {
  Field,
  Textarea,
  TextareaOnChangeData,
} from '@fluentui/react-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectGraficoFieldValue,
  setGraficoFieldValue,
} from '../../pages/indicadores/EstadisticaFormSlice';
import { Grafico } from '../../types/Grafico';

interface TextareaFieldEditorProps {
  chartIndex: number;
  fieldName: keyof Grafico;
  label: string;
}

const TextareaFieldEditor = ({
  chartIndex,
  fieldName,
  label,
}: TextareaFieldEditorProps) => {
  const dispath = useAppDispatch();
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
    <Field label={label}>
      <Textarea
        onChange={handleChange}
        value={value as string}
        resize="vertical"
      />
    </Field>
  );
};

export default TextareaFieldEditor;
