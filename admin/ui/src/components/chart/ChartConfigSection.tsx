import ChartTypeSelect from './ChartTypeSelect';
import ConfigSection from './ConfigSection';
import LabelDecimalsEditor from './LabelDecimalsEditor';
import ShowLabelsSwitch from './ShowLabelsSwitch';
import ShowLegendSwitch from './ShowLegendSwitch';
import TitleEditor from './TitleEditor';

interface ChartConfigSectionProps {
  chartIndex: number;
}

const ChartConfigSection = ({ chartIndex }: ChartConfigSectionProps) => {
  return (
    <ConfigSection title="Propiedades">
      <ChartTypeSelect chartIndex={chartIndex} />
      <TitleEditor chartIndex={chartIndex} />
      <ShowLabelsSwitch chartIndex={chartIndex} />
      <LabelDecimalsEditor chartIndex={chartIndex} />
    </ConfigSection>
  );
};

export default ChartConfigSection;
