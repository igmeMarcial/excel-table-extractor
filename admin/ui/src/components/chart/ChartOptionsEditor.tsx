import ChartConfigSection from './ChartConfigSection';
import ChartEjes from './ChartEjes';
import ChartTypeSelect from './ChartTypeSelect';
import ConfigSection from './ConfigSection';
import DataConfigSection from './DataConfigSection';
import LabelDecimalsEditor from './LabelDecimalsEditor';
import SeriesEditor from './SeriesEditor';
import ShowLabelsSwitch from './ShowLabelsSwitch';
import ShowLegendSwitch from './ShowLegendSwitch';
import TitleEditor from './TitleEditor';

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
