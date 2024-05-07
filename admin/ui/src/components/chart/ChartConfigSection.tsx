import ChartTypeSelect from './ChartTypeSelect';
import ConfigSection from '../ConfigSection';
import LabelDecimalsEditor from './LabelDecimalsEditor';
import ShowLabelsSwitch from './ShowLabelsSwitch';
import TextareaFieldEditor from './TextareaFieldEditor';
import { useAppSelector } from '../../app/hooks';
import { selectEstadisticaValues } from '../../pages/estadisticas/EstadisticaFormSlice';
import {
  determinarSubtituloParaGrafico,
  determinarTituloTablaDatosDefecto,
} from '../../utils/estadistica-utils';

interface ChartConfigSectionProps {
  chartId: number;
}

const ChartConfigSection = ({ chartId }: ChartConfigSectionProps) => {
  const estadistica = useAppSelector(selectEstadisticaValues);
  const placeholderTitulo = determinarTituloTablaDatosDefecto(
    estadistica.nombre,
    estadistica.periodoSerieTiempo
  );
  const placeholderSubtitulo = determinarSubtituloParaGrafico(
    '',
    estadistica.presentacionTablaSubtitulo,
    estadistica.presentacionTablaTitulo,
    estadistica.unidadMedida
  );
  return (
    <ConfigSection title="Propiedades">
      <ChartTypeSelect chartId={chartId} />
      <TextareaFieldEditor
        fieldName="titulo"
        label="Título"
        chartId={chartId}
        placeholder={placeholderTitulo}
      />
      <TextareaFieldEditor
        fieldName="subtitulo"
        label="Subtitulo"
        chartId={chartId}
        placeholder={placeholderSubtitulo}
      />
      <ShowLabelsSwitch chartId={chartId} />
      <LabelDecimalsEditor chartId={chartId} />
    </ConfigSection>
  );
};

export default ChartConfigSection;
