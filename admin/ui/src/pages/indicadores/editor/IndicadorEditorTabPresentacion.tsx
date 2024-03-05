import GraficoToolbar from './presentacion/GraficoToolbar';
import SeccionGrafico from './presentacion/SeccionGrafico';
import { useAppSelector } from '../../../app/hooks';
import { selectGraficos } from '../EstadisticaFormSlice';

const IndicadorEditorTabPresentacion = () => {
  const graficos = useAppSelector(selectGraficos);
  return (
    <div>
      {graficos.map((grafico, index) => (
        <SeccionGrafico key={index} index={index} options={grafico} />
      ))}
    </div>
  );
};

export default IndicadorEditorTabPresentacion;
