import { Field, Textarea } from '@fluentui/react-components';

interface ChartOptionsEditorProps {
  chartIndex: number;
}

const ChartOptionsEditor = ({ chartIndex }: ChartOptionsEditorProps) => {
  return (
    <div style={{ width: '240px', borderLeft: '1px solid #e8e8e8' }}>
      <div className="bg-gray-100 px-2 py-1 font-bold">Propiedades</div>
      <div className="p-2">
        <Field label="Título">
          <Textarea />
        </Field>
      </div>
    </div>
  );
};

export default ChartOptionsEditor;
