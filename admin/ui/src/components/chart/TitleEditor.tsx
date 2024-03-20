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

interface TitleEditorProps {
  chartIndex: number;
}

const TitleEditor = ({ chartIndex }: TitleEditorProps) => {
  const dispath = useAppDispatch();
  const fieldName = 'titulo';
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
    <Field label="Título">
      <Textarea onChange={handleChange} value={value} />
    </Field>
  );
};

export default TitleEditor;
