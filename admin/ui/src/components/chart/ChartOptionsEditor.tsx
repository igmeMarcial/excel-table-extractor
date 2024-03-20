import ChartTypeSelect from './ChartTypeSelect';
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
      <div className="bg-gray-100 px-2 py-1 font-bold">Propiedades</div>
      <div className="flex flex-col gap-y-3 px-2">
        <ChartTypeSelect chartIndex={chartIndex} />
        <TitleEditor chartIndex={chartIndex} />
        <ShowLabelsSwitch chartIndex={chartIndex} />
        <ShowLegendSwitch chartIndex={chartIndex} />
        <LabelDecimalsEditor chartIndex={chartIndex} />
        <SeriesEditor chartIndex={chartIndex} />
      </div>
    </div>
  );
};

export default ChartOptionsEditor;
