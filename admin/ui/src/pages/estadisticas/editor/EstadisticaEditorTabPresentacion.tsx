import SeccionGrafico from './presentacion/SeccionGrafico';
import { useAppSelector } from '../../../app/hooks';
import { selectGraficos } from '../EstadisticaFormSlice';
import SeccionTabla from './presentacion/SeccionTabla';

const EstadisticaEditorTabPresentacion = () => {
  const graficos = useAppSelector(selectGraficos);
  if (!graficos) return null;
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

export default EstadisticaEditorTabPresentacion;
