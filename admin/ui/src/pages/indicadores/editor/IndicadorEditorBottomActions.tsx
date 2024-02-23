import { Button } from 'antd';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  selectHasChanges,
  selectIsCreationMode,
  commitChanges,
} from '../EstadisticaFormSlice';
import { Link, useLocation } from 'react-router-dom';
import { builNavPathUrl } from '../../../utils/url-utils';

function IndicadorEditorBottomActions() {
  const location = useLocation();
  const dispath = useAppDispatch();
  const hasChanges = useAppSelector(selectHasChanges);
  const isCreationMode = useAppSelector(selectIsCreationMode);
  const handleClick = () => {
    // TODO implementar llamado a la API
    if (hasChanges) {
      dispath(commitChanges());
    } else {
      alert('No hay cambios para guardar');
    }
  };
  return (
    <div className="pl-12 bg-custom-grey py-2 flex space-x-4">
      <Button onClick={handleClick} type="primary" disabled={!hasChanges}>
        {isCreationMode ? 'Registrar' : 'Guardar'}
      </Button>
      <Link to={builNavPathUrl(location, 'indicadores')}>
        <Button>Cancelar</Button>
      </Link>
    </div>
  );
}
export default IndicadorEditorBottomActions;
