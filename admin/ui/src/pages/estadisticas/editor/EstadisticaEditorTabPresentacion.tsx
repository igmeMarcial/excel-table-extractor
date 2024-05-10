import SeccionGrafico from './presentacion/SeccionGrafico';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  resetPresentacionChanges,
  selectGraficos,
} from '../EstadisticaFormSlice';
import SeccionTabla from './presentacion/SeccionTabla';
import { Button } from 'antd';

const EstadisticaEditorTabPresentacion = () => {
  const dispatch = useAppDispatch();
  const graficos = useAppSelector(selectGraficos);
  if (!graficos) return null;
  const onRestaurarValoresDefecto = () => {
    dispatch(resetPresentacionChanges());
  };
  return (
    <>
      {graficos.map((grafico) => (
        <SeccionGrafico
          key={grafico.id}
          graficoId={grafico.id}
          options={grafico}
        />
      ))}
      <div className="mt-4">
        <SeccionTabla />
      </div>
      <div className="mt-4">
        <Button onClick={onRestaurarValoresDefecto}>
          Restaurar valores por defecto
        </Button>
      </div>
    </>
  );
};

export default EstadisticaEditorTabPresentacion;
