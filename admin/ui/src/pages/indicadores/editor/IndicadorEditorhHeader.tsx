import { Button, Tooltip } from 'antd';
import {
  ArrowImport24Regular,
  ArrowCurveDownLeft24Regular,
  ArrowCircleLeft24Regular,
  Save20Regular,
} from '@fluentui/react-icons';
import { SaveOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  selectTitulo,
  selectHasChanges,
  selectIsCreationMode,
  resetChanges,
} from '../EstadisticaFormSlice';
import IndicadorEditorModalImport from './IndicadorEditorModalImport';
import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { builNavPathUrl } from '../../../utils/url-utils';

const IndicadorEditorhHeader: React.FC = () => {
  const location = useLocation();
  const importDialogRef = useRef(null);
  const dispath = useAppDispatch();
  const titulo = useAppSelector(selectTitulo);
  const hasChanges = useAppSelector(selectHasChanges);
  const isCreationMode = useAppSelector(selectIsCreationMode);
  const importButtonTitle = isCreationMode ? 'Importar' : 'Actualizar datos';
  const importModalTitle = importButtonTitle;
  const handleDescartarCambios = () => {
    dispath(resetChanges());
  };
  const handleGuardarCambios = () => {
    console.log('Guardar cambios');
  };
  const urlIndicadores = builNavPathUrl(location, 'indicadores');
  return (
    <>
      <div className="bg-custom-grey flex px-12 pt-3 pb-3 gap-2 items-center relative">
        <Link to={urlIndicadores} className="absolute top-3 left-2">
          <Tooltip title="Volver a la lista de indicadores">
            <Button type="text" icon={<ArrowCircleLeft24Regular />}></Button>
          </Tooltip>
        </Link>
        <div className="text-2xl md:text-2xl font-bold p-0">Indicador</div>
        <span className="flex-1"></span>
        <Button
          type="text"
          icon={<ArrowImport24Regular className="align-middle" />}
          onClick={() => {
            importDialogRef.current.open();
          }}
        >
          {importButtonTitle}
        </Button>
        <IndicadorEditorModalImport
          ref={importDialogRef}
          title={importModalTitle}
        />
        <Button
          type="text"
          //style={{ color: '#2271B1' }}
          icon={
            <ArrowCurveDownLeft24Regular
              className="w-5 align-middle"
              //style={{ color: '#DA3B01' }}
            />
          }
          disabled={!hasChanges}
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
