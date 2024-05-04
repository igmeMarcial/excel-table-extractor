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
  chartIndex: number;
}

const ChartConfigSection = ({ chartIndex }: ChartConfigSectionProps) => {
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
      <ChartTypeSelect chartIndex={chartIndex} />
      <TextareaFieldEditor
        fieldName="titulo"
        label="Título"
        chartIndex={chartIndex}
        placeholder={placeholderTitulo}
      />
      <TextareaFieldEditor
        fieldName="subtitulo"
        label="Subtitulo"
        chartIndex={chartIndex}
        placeholder={placeholderSubtitulo}
      />
      <ShowLabelsSwitch chartIndex={chartIndex} />
      <LabelDecimalsEditor chartIndex={chartIndex} />
    </ConfigSection>
  );
};

export default ChartConfigSection;
