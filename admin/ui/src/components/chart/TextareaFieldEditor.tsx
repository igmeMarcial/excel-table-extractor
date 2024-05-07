import {
  Field,
  Textarea,
  TextareaOnChangeData,
} from '@fluentui/react-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectGraficoFieldValue,
  setGraficoFieldValue,
} from '../../pages/estadisticas/EstadisticaFormSlice';
import { Grafico } from '../../types/Grafico';

interface TextareaFieldEditorProps {
  chartId: number;
  fieldName: keyof Grafico;
  label: string;
  placeholder?: string;
}

const TextareaFieldEditor = ({
  chartId,
  fieldName,
  label,
  placeholder,
}: TextareaFieldEditorProps) => {
  const dispath = useAppDispatch();
  let value = useAppSelector(selectGraficoFieldValue(chartId, fieldName));
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
    <Field label={label}>
      <Textarea
        onChange={handleChange}
        value={value as string}
        resize="vertical"
        placeholder={placeholder}
      />
    </Field>
  );
};

export default TextareaFieldEditor;
