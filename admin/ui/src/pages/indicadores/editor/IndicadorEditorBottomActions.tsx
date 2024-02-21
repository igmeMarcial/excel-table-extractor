import { Button } from 'antd';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  setHasChanges,
  selectHasChanges,
  selectIsCreationMode,
  selectEstadisticaFields,
  selectEstadisticaDataFields,
} from '../EstadisticaFormSlice';
import { Link } from 'react-router-dom';
import { getNewPathUrl } from '../../../hooks/usePathRoute';

const IndicadorEditorBottomActions = () => {
  const dispath = useAppDispatch();
  const hasChanges = useAppSelector(selectHasChanges);
  const isCreationMode = useAppSelector(selectIsCreationMode);
  const valuesData = useAppSelector(selectEstadisticaDataFields);
  const valuesEstadisticas = useAppSelector(selectEstadisticaFields);
  const handleClick = () => {
    if (valuesData) {
      // Verificar si alguna propiedad de valuesData es distinta de "" o null
      const hasData = Object.values(valuesData).some(
        (value) => value !== '' && value !== null
      );
      if (hasData) {
        console.log(valuesData);
      }
    }
     if (valuesEstadisticas) {
    // Verificar si alguna propiedad de valuesEstadisticas es distinta de "" o null
    const hasData = Object.values(valuesEstadisticas).some(
      (value) => value !== '' && value !== null
    );
    if (hasData) {
      console.log(valuesEstadisticas);
    }

    dispath(setHasChanges(false));
  }

  }
  return (
    <div className="pl-12 bg-custom-grey py-2 flex space-x-4">
      <Button onClick={handleClick} type="primary" disabled={!hasChanges}>
        {isCreationMode ? 'Registrar' : 'Guardar'}
      </Button>
      <Link to={getNewPathUrl('indicadores')}>
        <Button>Cancelar</Button>
      </Link>
    </div>
  );
};
export default IndicadorEditorBottomActions;
