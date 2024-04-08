import React, { FC, useEffect, useRef, useState } from 'react';
import UploadFileButton from '../../../components/UploadFileButton';
import { Modal, Button, Checkbox } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectIsCreationMode,
  setActiveTab,
  setEstadisticaDatos,
  setEstadisticaFields,
} from '../EstadisticaFormSlice';
import ExtractDataExcelService from '../../../services/ExtractDataExcelService';
import { WorkBook } from 'xlsx';
import { EstadisticaDatos } from '../../../types/EstadisticaDatos';
import { FichaTecnicaFields } from '../../../types/Estadistica';
import DataRangeConfirmDialog from '../../../components/chart/DataRangeConfirmDialog';

const Importar: FC = () => {
  const [fileUploading, setFileUploading] = useState(false);
  const [workbookFile, setWorkBookFile] = useState<WorkBook>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasFile, setHasFile] = useState<boolean>(false);
  const [titleIndicador, setTitleIndicador] = useState<string>('');
  const [showIndicadorFields, setShowIndicadorFields] = useState(false);
  const [showEstadisticaData, setShowEstadisticaData] = useState(false);
  const [tableData, setTableData] = useState<EstadisticaDatos>(null);
  const [indicadorData, setIndicadorData] = useState<FichaTecnicaFields>(null);
  const dispath = useAppDispatch();
  const isCreationMode = useAppSelector(selectIsCreationMode);
  const importButtonTitle = isCreationMode ? 'Importar' : 'Actualizar datos';
  const importModalTitle = importButtonTitle;
  const extractDataExcelService = new ExtractDataExcelService();

  const importSelectRange = useRef(null);

  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    setFileUploading(true);
    try {
      const workbook = await extractDataExcelService.readExcelFile(file);
      if (workbook) {
        setWorkBookFile(workbook);
        const tituloIndicador = extractDataExcelService.getNameIndicador(
          workbook,
          1
        );
        setTitleIndicador(tituloIndicador?.nombreIndicador);
        setIsModalOpen(true);
        setHasFile(true);

        if (!tituloIndicador?.nombreIndicador) {
          setFileUploading(false);
          alert(
            'El archivo debe ser tipo Indicador, con hoja1 de datos y hoja2 de ficha técnica'
          );
          return;
        }
      }
    } catch (error) {
      setFileUploading(false);
      alert('El archivo.xlsx debe ser  tipo Indicador');
    }
  };
  const handleOk = () => {
    // modal second
    importSelectRange.current.open();
    setIsModalOpen(false);
    setFileUploading(false);
    if (showIndicadorFields && showEstadisticaData) {
      dispath(setEstadisticaDatos(tableData));
      dispath(setEstadisticaFields(indicadorData));
    } else if (showIndicadorFields) {
      dispath(setEstadisticaFields(indicadorData));
    } else if (showEstadisticaData) {
      dispath(setEstadisticaDatos(tableData));
    }
    setHasFile(false);
    setShowIndicadorFields(false);
    setShowEstadisticaData(false);
    let activeTabValue: string;
    if (showIndicadorFields) {
      activeTabValue = '1';
    } else if (showEstadisticaData) {
      activeTabValue = '2';
    } else {
      activeTabValue = '1'; // Valor por defecto si ninguna opción está seleccionada
    }
    dispath(setActiveTab(activeTabValue));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setFileUploading(false);
    setHasFile(false);
    setShowIndicadorFields(false); // Reiniciar estado de los checkboxes
    setShowEstadisticaData(false);
  };
  const modalStyles = {
    footer: {
      display: 'flex',
    },
  };
  useEffect(() => {
    if (workbookFile) {
      if (showIndicadorFields) {
        const dataIndicator =
          extractDataExcelService.getEstadisticaFieldsFichaTecnica(
            workbookFile,
            1
          );
        setIndicadorData(dataIndicator);
      }
      if (showEstadisticaData) {
        // console.log(workbookFile);
        const dataTable = extractDataExcelService.extractDataFromFile(
          workbookFile,
          0
        );
        setTableData(dataTable);
      }
    }
  }, [showIndicadorFields, showEstadisticaData]);
  return (
    <>
      <UploadFileButton
        text={importButtonTitle}
        accept=".xlsx"
        onFileChange={handleFileChange}
        uploading={fileUploading}
      />
      <Modal
        title={importModalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        styles={modalStyles}
        width={700}
        footer={[
          <Button
            disabled={!showIndicadorFields && !showEstadisticaData}
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            Importar
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <section className="mb-5">
          {hasFile && (
            <>
              <div className="mb-2">
                <span className="text-blue-500">
                  Indicador detectado en la ficha
                </span>
                {titleIndicador && (
                  <div className="mt-1 font-semibold">{titleIndicador}</div>
                )}
              </div>
              <div className="">
                <span className="text-blue-500">
                  Selecciona los datos a importar
                </span>
                <div className="flex flex-col pl-4 gap-2 mt-1">
                  <Checkbox
                    checked={showIndicadorFields}
                    onChange={() =>
                      setShowIndicadorFields((checked) => !checked)
                    }
                  >
                    Campos de ficha técnica
                  </Checkbox>
                  <Checkbox
                    checked={showEstadisticaData}
                    onChange={() =>
                      setShowEstadisticaData((checked) => !checked)
                    }
                  >
                    Datos estadísticos
                  </Checkbox>
                </div>
              </div>
            </>
          )}
        </section>
      </Modal>
      <DataRangeConfirmDialog ref={importSelectRange} />
    </>
  );
};

export default Importar;
