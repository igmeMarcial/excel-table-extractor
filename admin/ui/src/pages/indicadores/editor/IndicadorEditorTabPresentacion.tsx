import SeccionGrafico from './presentacion/SeccionGrafico';
import { useAppSelector } from '../../../app/hooks';
import { selectGraficos } from '../EstadisticaFormSlice';

const IndicadorEditorTabPresentacion = () => {
  const graficos = useAppSelector(selectGraficos);
  return (
    <>
      {graficos.map((grafico, index) => (
        <SeccionGrafico key={index} index={index} options={grafico} />
      ))}
    </>
  );
};

export default IndicadorEditorTabPresentacion;
