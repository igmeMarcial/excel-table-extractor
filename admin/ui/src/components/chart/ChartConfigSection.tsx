import ChartTypeSelect from './ChartTypeSelect';
import ConfigSection from '../ConfigSection';
import LabelDecimalsEditor from './LabelDecimalsEditor';
import ShowLabelsSwitch from './ShowLabelsSwitch';
import TextareaFieldEditor from './TextareaFieldEditor';

interface ChartConfigSectionProps {
  chartIndex: number;
}

const ChartConfigSection = ({ chartIndex }: ChartConfigSectionProps) => {
  return (
    <ConfigSection title="Propiedades">
      <ChartTypeSelect chartIndex={chartIndex} />
      <TextareaFieldEditor
        fieldName="titulo"
        label="Título"
        chartIndex={chartIndex}
      />
      <TextareaFieldEditor
        fieldName="subtitulo"
        label="Subtitulo"
        chartIndex={chartIndex}
      />
      <ShowLabelsSwitch chartIndex={chartIndex} />
      <LabelDecimalsEditor chartIndex={chartIndex} />
    </ConfigSection>
  );
};

export default ChartConfigSection;
