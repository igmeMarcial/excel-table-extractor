import { Button } from 'antd';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  selectHasChanges,
  selectIsCreationMode,
  commitChanges,
  selectPostValues,
} from '../EstadisticaFormSlice';
import { Link, useLocation } from 'react-router-dom';
import { builNavPathUrl } from '../../../utils/url-utils';
import {
  useAddEstadisticaMutation,
  useSaveEstadisticaMutation,
} from '../../../app/services/estadistica';

function IndicadorEditorBottomActions() {
  const location = useLocation();
  const dispath = useAppDispatch();
  const hasChanges = useAppSelector(selectHasChanges);
  const isCreationMode = useAppSelector(selectIsCreationMode);
  const postValues = useAppSelector(selectPostValues);
  console.log('postValues', postValues);
  console.log('isCreationMode', isCreationMode);
  const [addEstadistic, { isLoading }] =
    useSaveEstadisticaMutation(isCreationMode);
  //const [addEstadisticax, { isLoading }] = useAddEstadisticaMutation();
  const handleSave = async () => {
    // TODO implementar llamado a la API
    if (hasChanges) {
      await addEstadistic(postValues);
      dispath(commitChanges());
      console.log(postValues);
    } else {
      alert('No hay cambios para guardar');
    }
  };
  return (
    <div className="pl-12 bg-custom-grey py-2 flex space-x-4">
      <Button onClick={handleSave} type="primary" disabled={!hasChanges}>
        {isCreationMode ? 'Registrar' : 'Guardar'}
      </Button>
      <Link to={builNavPathUrl(location, 'indicadores')}>
        <Button>Cancelar</Button>
      </Link>
    </div>
  );
}
export default IndicadorEditorBottomActions;
