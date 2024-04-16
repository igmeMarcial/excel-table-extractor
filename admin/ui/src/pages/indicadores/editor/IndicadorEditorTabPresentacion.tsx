import SeccionGrafico from './presentacion/SeccionGrafico';
import { useAppSelector } from '../../../app/hooks';
import { selectGraficos } from '../EstadisticaFormSlice';
import SeccionTabla from './presentacion/SeccionTabla';

const IndicadorEditorTabPresentacion = () => {
  const graficos = useAppSelector(selectGraficos);
  return (
    <>
      {graficos.map((grafico, index) => (
        <SeccionGrafico key={index} index={index} options={grafico} />
      ))}
      <div className="mt-4">
        <SeccionTabla />
      </div>
    </>
  );
};

export default IndicadorEditorTabPresentacion;
