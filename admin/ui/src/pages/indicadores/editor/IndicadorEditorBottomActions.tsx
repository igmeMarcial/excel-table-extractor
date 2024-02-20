import React from 'react';
import { Button } from 'antd';
import EstadisticaService from '../../../services/EstadisticaService';
import { Link } from 'react-router-dom';
import { getNewPathUrl } from '../../../hooks/usePathRoute';

interface Estadistica {
  nombre?: string;
}
interface Datos {
  titulo?: string;
  tablaDatos?: any;
  nota?: string;
  fuente?: string;
  elaboracion?: string;
}
interface IndicadorEditorBottomActionsProps {
  estadistica?: Estadistica;
  datos?: Datos;
}
const IndicadorEditorBottomActions: React.FC<
  IndicadorEditorBottomActionsProps
> = ({ estadistica, datos }) => {
 
  console.log(estadistica)

  const handleClick = () => {
    if (estadistica) {
      // EstadisticaService.create(estadistica)
      //   .then((response) => {
      //     console.log('Registro de estadística exitoso');
      //   })
      //   .catch((err) => {
      //     console.error('Error al registrar estadística:', err);
      //   })
      //   .finally(() => {
      //     console.log('Finalizado');
      //   });
      console.log("datos evvidado ........ de estadisticxas:")
       console.log(estadistica)
    }
    if (datos) {
      // console.log('Datos enviados:', datos);
      // window.alert('Datos enviados');
    }
  };

  // Verifica si al menos una propiedad tiene valor
  const hasEstadisticaValue =
    estadistica && Object.values(estadistica).some((value) => value !== '');
  const hasDatosValue =
    datos &&
    Object.values(datos).some((value) => value !== '' && value !== null);

  return (
    <div className="pl-12 bg-custom-grey py-2 flex space-x-4">
      <Button
        onClick={handleClick}
        type="primary"
        disabled={!hasEstadisticaValue && !hasDatosValue}
      >
        Registrar
      </Button>
      <Link to={getNewPathUrl('indicadores')}>
        <Button>Cancelar</Button>
      </Link>
    </div>
  );
};
export default IndicadorEditorBottomActions;
