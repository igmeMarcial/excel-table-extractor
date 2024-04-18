import { useRef, useState } from 'react';
import { Modal, Button, Checkbox, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectIsCreationMode,
  setActiveTab,
  setEstadisticaDatos,
  setEstadisticaFields,
} from '../EstadisticaFormSlice';
import fichaExcelService from '../../../services/ExtractDataExcelService';
import { WorkBook } from 'xlsx';
import { EstadisticaDatos } from '../../../types/EstadisticaDatos';
import DataRangeConfirmDialog, {
  DataRangeConfirmDialogRef,
} from '../../../components/chart/DataRangeConfirmDialog';
import { EstadisticaWorkbook } from '../../../core/EstadisticaWorkbook';
import SelectFileButton from '../../../components/SelectFileButton';
import { CellRange } from '../../../types/CellRange';

const Importar = () => {
  const dispath = useAppDispatch();
  const isCreationMode = useAppSelector(selectIsCreationMode);
  const [estadisticaWorkbook, setEstadisticaWorkbook] =
    useState<EstadisticaWorkbook | null>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [camposFichaSheetIndex, setCamposFichaSheetIndex] = useState<number>(1);
  const [tablaDatosSheetIndex, setTablaDatosSheetIndex] = useState<number>(0);
  const [readingFile, setReadingFile] = useState(false);
  const [workbookFile, setWorkBookFile] = useState<WorkBook>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [camposFichaChecked, setCamposFichaChecked] = useState(false);
  const [tablaDatosChecked, setTablaDatosChecked] = useState(false);

  const importButtonTitle = isCreationMode ? 'Importar' : 'Actualizar datos';
  const importModalTitle = importButtonTitle;
  const confirmDataRangeDialogRef = useRef<DataRangeConfirmDialogRef>(null);
  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    setCamposFichaChecked(isCreationMode);
    setTablaDatosChecked(true);
    setReadingFile(true);
    // Lógica para leer el archivo
    fichaExcelService
      .getWorksbook(file)
      .then((workbook) => {
        const estadisticaWorkbook = new EstadisticaWorkbook(workbook);
        setEstadisticaWorkbook(estadisticaWorkbook);
        setSheetNames(workbook.SheetNames);
        if (workbook) {
          setWorkBookFile(workbook);
          setIsModalOpen(true);
        }
      })
      .catch((error) => {
        setReadingFile(false);
        alert(
          'Ocurrió un error al leer el archivo Excel, verifique que el archivo sea válido y tenga el fomato correcto.'
        );
      })
      .finally(() => {
        setReadingFile(false);
      });
  };
  const afterImportData = () => {
    // Lógica después de extraer los datos
    setIsModalOpen(false);
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

  const extractCamposFicha = () => {
    if (workbookFile) {
      if (camposFichaChecked) {
        const dataIndicator =
          fichaExcelService.getEstadisticaFieldsFichaTecnica(
            workbookFile,
            camposFichaSheetIndex
          );
        dispath(setEstadisticaFields(dataIndicator));
      }
    }
  };
  const extractTablaDatos = (range: CellRange) => {
    const sheetDataMap = fichaExcelService.getSheetDataMap(
      workbookFile,
      tablaDatosSheetIndex
    );
    const newRange = fichaExcelService.getHtmlCellsRange(sheetDataMap, range);
    const sheetData = fichaExcelService.getCellsMatrix(newRange);
    const data = fichaExcelService.extractDataFromFile(
      workbookFile,
      tablaDatosSheetIndex
    );
    // Combinar los datos de sheetData y data en un nuevo objeto EstadisticaDatos
    const combinedData: EstadisticaDatos = {
      tabla: sheetData, // Utilizar solo los datos de sheetData
      titulo: data.titulo,
      nota: data.nota,
      fuente: data.fuente,
      elaboracion: data.elaboracion,
    };
    dispath(setEstadisticaDatos(combinedData));
  };
  const handleOk = () => {
    if (tablaDatosChecked) {
      showConfirmRangoDatos();
      return;
    }
    doImportCamposFicha();
  };

  const doImportCamposFicha = () => {
    extractCamposFicha();
    afterImportData();
  };

  const doImportTablaDatos = (range: CellRange) => {
    extractTablaDatos(range);
    afterImportData();
  };

  const showConfirmRangoDatos = () => {
    // Mostrar dialogo confirmar rango de datos
    const sheetDataMap = fichaExcelService.getSheetDataMap(
      workbookFile,
      tablaDatosSheetIndex
    );
    const sheetData = fichaExcelService.getCellsMatrix(sheetDataMap);
    const rangoTablaDatos = fichaExcelService.getRangoTablaDatos(sheetDataMap);
    confirmDataRangeDialogRef.current.open({
      data: sheetData,
      dataSelectionRange: rangoTablaDatos,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setReadingFile(false);
    setCamposFichaChecked(false); // Reiniciar estado de los checkboxes
    setTablaDatosChecked(false);
  };
  const modalStyles = {
    footer: {
      display: 'flex',
    },
  };
  return (
    <>
      <SelectFileButton
        text={importButtonTitle}
        accept=".xlsx"
        onFileChange={handleFileChange}
        loading={readingFile}
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
        <div className="my-5">
          <span>Datos a incluir:</span>
          <div className="mt-1">
            <Checkbox
              checked={tablaDatosChecked}
              onChange={() => setTablaDatosChecked((checked) => !checked)}
            >
              Tabla de datos, desde la hoja:
            </Checkbox>

            <Select
              value={tablaDatosSheetIndex}
              disabled={!tablaDatosChecked}
              style={{ width: '100px' }}
              options={sheetNames.map((sheet, index) => ({
                label: sheet,
                value: index,
              }))}
              size="small"
              onChange={(value) => {
                setTablaDatosSheetIndex(value);
                setCamposFichaSheetIndex(value + 1);
              }}
            ></Select>
          </div>
          <div className="mt-2">
            <Checkbox
              checked={camposFichaChecked}
              onChange={() => setCamposFichaChecked((checked) => !checked)}
            >
              Campos de ficha técnica, desde la hoja:
            </Checkbox>
            <Select
              value={camposFichaSheetIndex}
              disabled={!camposFichaChecked}
              style={{ width: '100px' }}
              options={sheetNames.map((sheet, index) => ({
                label: sheet,
                value: index,
              }))}
              size="small"
              onChange={(value) => {
                setCamposFichaSheetIndex(value);
              }}
            ></Select>
          </div>
        </div>
      </Modal>
      <DataRangeConfirmDialog
        ref={confirmDataRangeDialogRef}
        onConfirm={(range) => {
          doImportTablaDatos(range);
          if (camposFichaChecked) {
            doImportCamposFicha();
          }
        }}
      />
    </>
  );
};

export default Importar;
