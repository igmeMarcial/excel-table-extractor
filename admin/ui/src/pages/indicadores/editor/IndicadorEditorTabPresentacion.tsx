import IndicatorEditorTabPresentationLeft from './presentacion/IndicatorEditorTabPresentationLeft';
import SeccionGrafico from './presentacion/SeccionGrafico';
import { useAppSelector } from '../../../app/hooks';
import { selectGraficos } from '../EstadisticaFormSlice';

const IndicadorEditorTabPresentacion = () => {
  const graficos = useAppSelector(selectGraficos);
  return (
    <div className="flex overflow-y-auto " style={{ height: '380px' }}>
      <IndicatorEditorTabPresentationLeft />
      {graficos.map((grafico, index) => (
        <SeccionGrafico key={index} index={index} options={grafico} />
      ))}
    </div>
  );
};

export default IndicadorEditorTabPresentacion;
