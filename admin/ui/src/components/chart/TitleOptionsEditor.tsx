import { Field, Textarea } from '@fluentui/react-components';
import { Input } from 'antd';

interface TitleOptionsEditorProps {
  chartIndex: number;
}

const TitleOptionsEditor = ({ chartIndex }: TitleOptionsEditorProps) => {
  return (
    <div>
      <div className="bg-gray-400">Título</div>
      <Field label="Título">
        <Textarea />
      </Field>
    </div>
  );
};

export default TitleOptionsEditor;
