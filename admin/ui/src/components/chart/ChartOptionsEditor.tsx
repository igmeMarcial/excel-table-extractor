import ChartConfigSection from './ChartConfigSection';
import DataConfigSection from './DataConfigSection';

interface ChartOptionsEditorProps {
  chartIndex: number;
}

const ChartOptionsEditor = ({ chartIndex }: ChartOptionsEditorProps) => {
  return (
    <div style={{ width: '260px', borderLeft: '1px solid #e8e8e8' }}>
      <ChartConfigSection chartIndex={chartIndex} />
      <DataConfigSection chartIndex={chartIndex} />
    </div>
  );
};

export default ChartOptionsEditor;
