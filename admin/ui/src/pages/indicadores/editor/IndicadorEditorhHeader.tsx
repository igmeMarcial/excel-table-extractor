import { Button } from 'antd';
import {
  ArrowImport24Regular,
  ArrowCurveDownLeft24Regular,
} from '@fluentui/react-icons';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  setHasChanges,
  selectTitulo,
  selectHasChanges,
  selectIsCreationMode,
} from '../EstadisticaFormSlice';
import IndicadorEditorModalImport from './IndicadorEditorModalImport';
import React, { useRef } from 'react';



const IndicadorEditorhHeader: React.FC = () => {
  const importDialogRef = useRef(null);
  const dispath = useAppDispatch();
  const titulo = useAppSelector(selectTitulo);
  const hasChanges = useAppSelector(selectHasChanges);
  const isCreationMode = useAppSelector(selectIsCreationMode);
  
  return (
    <>
      <div className="bg-custom-grey flex px-12 pt-3 pb-3 gap-2 items-center">
        <p className="text-2xl md:text-2xl font-bold p-0 m-1">Indicador</p>
        <span className="flex-1"></span>
        <Button
          type="text"
          icon={<ArrowImport24Regular className="align-middle" />}
          onClick={() => {
            importDialogRef.current.open();
          }}
        >
          {isCreationMode ? 'Importar' : 'Actualizar'} desde ficha técnica
        </Button>
        <IndicadorEditorModalImport
          onTableData="borrar"
          ref={importDialogRef}
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
          onClick={() => {
            dispath(setHasChanges(false));
          }}
        >
          Descartar cambios
        </Button>
      </div>
      <p className="block bg-custom-grey m-0 px-12 font-semibold text-sm pb-3 truncate">
        {titulo || 'Nombre indicador...'}
      </p>
    </>
  );
};

export default IndicadorEditorhHeader;
