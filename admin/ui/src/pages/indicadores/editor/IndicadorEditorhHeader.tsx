import { Button, Tooltip, Upload } from 'antd';
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
  commitChanges,
  selectPostValues,
} from '../EstadisticaFormSlice';
import IndicadorEditorModalImport from './IndicadorEditorModalImport';
import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { builNavPathUrl } from '../../../utils/url-utils';
import { useSaveEstadisticaMutation } from '../../../app/services/estadistica';
import ExtractDataExcelService from '../../../services/ExtractDataExcelService';
import { WorkBook } from 'xlsx';

const IndicadorEditorhHeader: React.FC = () => {
  const [workbookFile, setWorkBookFile] = useState<WorkBook>(null);
  const [titleIndicador, setTitleIndicador] = useState<string>('');
  const [hasFile, setHasFile] = useState<boolean>(false);
  const location = useLocation();
  const importDialogRef = useRef(null);
  const dispath = useAppDispatch();
  const titulo = useAppSelector(selectTitulo);
  const hasChanges = useAppSelector(selectHasChanges);
  const isCreationMode = useAppSelector(selectIsCreationMode);
  const postValues = useAppSelector(selectPostValues);
  const importButtonTitle = isCreationMode ? 'Importar' : 'Actualizar datos';
  const importModalTitle = importButtonTitle;
  const [addEstadistica, { isLoading }] =
    useSaveEstadisticaMutation(isCreationMode);
  const extractDataExcelService = new ExtractDataExcelService();
  const handleDescartarCambios = () => {
    dispath(resetChanges());
  };
  const handleGuardarCambios = async () => {
    if (hasChanges) {
      await addEstadistica(postValues);
      dispath(commitChanges());
    } else {
      alert('No hay cambios para guardar');
    }
  };
  const handleFileChange = async (info) => {
    const selectedFile = info.file.originFileObj;
    if (info.file.status !== 'uploading') {
      try {
        const workbook = await extractDataExcelService.readExcelFile(
          selectedFile
        );
        setWorkBookFile(workbook);
        if (workbook) {
          const cellVallueTitle =
            await extractDataExcelService.getNameIndicador(workbook, 1);
          setTitleIndicador(cellVallueTitle);
          setHasFile(true);
        }
      } catch (error) {
        setHasFile(false);
        alert(
          'El archivo tiene que ser tipo Indicador, hoja1 ficha técnica y hoja2 datos'
        );
      }
    }
  };
  const props = {
    onChange: handleFileChange,
    multiple: false,
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
        <Upload showUploadList={false} {...props}>
          <Button
            type="text"
            icon={<ArrowImport24Regular className="align-middle" />}
          >
            {importButtonTitle}
          </Button>
        </Upload>
        <IndicadorEditorModalImport
          ref={importDialogRef}
          title={importModalTitle}
          hasFile={hasFile}
          setHasFile={setHasFile}
          titleIndicador={titleIndicador}
          workBook={workbookFile}
        />
        <Button
          type="text"
          icon={<ArrowCurveDownLeft24Regular className="w-5 align-middle" />}
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
