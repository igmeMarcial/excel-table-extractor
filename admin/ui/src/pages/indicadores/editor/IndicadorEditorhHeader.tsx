import { Button, Tooltip } from 'antd';
import {
  ArrowCurveDownLeft24Regular,
  ArrowCircleLeft24Regular,
} from '@fluentui/react-icons';
import { SaveOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  selectTitulo,
  selectHasChanges,
  selectIsCreationMode,
  resetChanges,
  commitChanges,
  selectPostValues,
  setResetDefault,
  selectEstadisticaFields,
} from '../EstadisticaFormSlice';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPathUrl } from '../../../utils/url-utils';
import { useSaveEstadisticaMutation } from '../../../app/services/estadistica';
import Importar from './IndicadorEditorModalImport';

const IndicadorEditorhHeader: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const dispath = useAppDispatch();
  const titulo = useAppSelector(selectTitulo);
  const hasChanges = useAppSelector(selectHasChanges);
  const isCreationMode = useAppSelector(selectIsCreationMode);
  const postValues = useAppSelector(selectPostValues);

  const valuesTest = useAppSelector(selectEstadisticaFields);

  const [addEstadistica, { isLoading }] =
    useSaveEstadisticaMutation(isCreationMode);
  const handleDescartarCambios = () => {
    dispath(resetChanges());
  };
  const handleGuardarCambios = async () => {
    if (hasChanges) {
      await addEstadistica(postValues);
      dispath(commitChanges());
      // navigate(urlIndicadores);
      dispath(setResetDefault());
    } else {
      alert('No hay cambios para guardar');
    }
  };
  const urlIndicadores = resetPathUrl(location, 'indicadores');
  return (
    <>
      <div className="bg-custom-grey flex px-12 pt-3 pb-3 gap-2 items-center relative">
        <Link to={urlIndicadores} className="absolute top-3 left-2">
          <Tooltip title="Volver a la lista de indicadores">
            <Button
              onClick={() => dispath(setResetDefault())}
              type="text"
              icon={<ArrowCircleLeft24Regular />}
            ></Button>
          </Tooltip>
        </Link>
        <div className="text-2xl md:text-2xl font-bold p-0">Indicador</div>
        <span className="flex-1"></span>
        <Importar />
        <Button
          type="text"
          icon={<ArrowCurveDownLeft24Regular className="w-5 align-middle" />}
          // disabled={!hasChanges}
          onClick={handleDescartarCambios}
        >
          Deshacer cambios
        </Button>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          disabled={!hasChanges}
          onClick={handleGuardarCambios}
          shape="round"
        >
          <span>Guardar</span>
        </Button>
      </div>
      <p className="block bg-custom-grey m-0 px-12 font-semibold text-sm pb-3 truncate">
        {titulo || 'Nombre indicador...'}
      </p>
    </>
  );
};

export default IndicadorEditorhHeader;
