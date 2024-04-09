import React, { useEffect, useRef, useState } from 'react';
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
import { decodeCellRange } from '../../../utils/decodeCellRange';

const Importar = () => {
  const [fileUploading, setFileUploading] = useState(false);
  const [workbookFile, setWorkBookFile] = useState<WorkBook>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasFile, setHasFile] = useState<boolean>(false);
  const [titleIndicador, setTitleIndicador] = useState<string>('');
  const [camposFichaChecked, setCamposFichaChecked] = useState(false);
  const [tablaDatosChecked, setTablaDatosChecked] = useState(false);
  const [tableData, setTableData] = useState<EstadisticaDatos>(null);
  const [indicadorData, setIndicadorData] = useState<FichaTecnicaFields>(null);
  const dispath = useAppDispatch();
  const isCreationMode = useAppSelector(selectIsCreationMode);
  const importButtonTitle = isCreationMode ? 'Importar' : 'Actualizar datos';
  const importModalTitle = importButtonTitle;
  const extractDataExcelService = new ExtractDataExcelService();

  const confirmDataRangeDialogRef = useRef(null);
  const tempSelRange = decodeCellRange('B2:D5');

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
    if (tablaDatosChecked) {
      handleConfirmRangoDatos();
      return;
    }
    setIsModalOpen(false);
    setFileUploading(false);
    if (camposFichaChecked && tablaDatosChecked) {
      dispath(setEstadisticaDatos(tableData));
      dispath(setEstadisticaFields(indicadorData));
    } else if (camposFichaChecked) {
      dispath(setEstadisticaFields(indicadorData));
    } else if (tablaDatosChecked) {
      dispath(setEstadisticaDatos(tableData));
    }
    setHasFile(false);
    setCamposFichaChecked(false);
    setTablaDatosChecked(false);
    let activeTabValue: string;
    if (camposFichaChecked) {
      activeTabValue = '1';
    } else if (tablaDatosChecked) {
      activeTabValue = '2';
    } else {
      activeTabValue = '1'; // Valor por defecto si ninguna opción está seleccionada
    }
    dispath(setActiveTab(activeTabValue));
  };

  const handleConfirmRangoDatos = () => {
    // Mostrar dialogo confirmar rango de datos
    const sheetDataMap = extractDataExcelService.getSheetDataMap(
      workbookFile,
      0
    );
    const sheetData = extractDataExcelService.getCellsMatrix(sheetDataMap);
    const rangoTablaDatos =
      extractDataExcelService.getRangoTablaDatos(sheetDataMap);
    confirmDataRangeDialogRef.current.open({
      data: sheetData,
      dataSelectionRange: rangoTablaDatos,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFileUploading(false);
    setHasFile(false);
    setCamposFichaChecked(false); // Reiniciar estado de los checkboxes
    setTablaDatosChecked(false);
  };
  const modalStyles = {
    footer: {
      display: 'flex',
    },
  };
  useEffect(() => {
    if (workbookFile) {
      if (camposFichaChecked) {
        const dataIndicator =
          extractDataExcelService.getEstadisticaFieldsFichaTecnica(
            workbookFile,
            1
          );
        setIndicadorData(dataIndicator);
      }
    }
  }, [camposFichaChecked]);
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
            disabled={!camposFichaChecked && !tablaDatosChecked}
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
                    checked={camposFichaChecked}
                    onChange={() =>
                      setCamposFichaChecked((checked) => !checked)
                    }
                  >
                    Campos de ficha técnica
                  </Checkbox>
                  <Checkbox
                    checked={tablaDatosChecked}
                    onChange={() => setTablaDatosChecked((checked) => !checked)}
                  >
                    Tabla de datos
                  </Checkbox>
                </div>
              </div>
            </>
          )}
        </section>
      </Modal>
      <DataRangeConfirmDialog ref={confirmDataRangeDialogRef} />
    </>
  );
};

export default Importar;
