import SeccionGrafico from './presentacion/SeccionGrafico';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectEstadisticaDatos,
  selectGraficos,
  setEstadisticaDatos,
} from '../EstadisticaFormSlice';
import SeccionTabla from './presentacion/SeccionTabla';
import { Button } from 'antd';

const EstadisticaEditorTabPresentacion = () => {
  const dispatch = useAppDispatch();
  const graficos = useAppSelector(selectGraficos);
  const datos = useAppSelector(selectEstadisticaDatos);
  if (!graficos) return null;
  const onRestaurarValoresPorDefecto = () => {
    dispatch(setEstadisticaDatos(datos));
    console.log('Restaurar valores por defecto');
  };
  return (
    <>
      {graficos.map((grafico, index) => (
        <SeccionGrafico key={index} graficoId={grafico.id} options={grafico} />
      ))}
      <div className="mt-4">
        <SeccionTabla />
      </div>
      <div className="mt-4">
        <Button onClick={onRestaurarValoresPorDefecto}>
          Restaurar valores por defecto
        </Button>
      </div>
    </>
  );
};

export default EstadisticaEditorTabPresentacion;
