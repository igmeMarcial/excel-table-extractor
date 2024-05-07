import ChartConfigSection from './ChartConfigSection';
import DataConfigSection from './DataConfigSection';

interface ChartOptionsEditorProps {
  chartId: number;
}

const ChartOptionsEditor = ({ chartId }: ChartOptionsEditorProps) => {
  return (
    <div style={{ width: '260px', borderLeft: '1px solid #e8e8e8' }}>
      <ChartConfigSection chartId={chartId} />
      <DataConfigSection chartId={chartId} />
    </div>
  );
};

export default ChartOptionsEditor;
