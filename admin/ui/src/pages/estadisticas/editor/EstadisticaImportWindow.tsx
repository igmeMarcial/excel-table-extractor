import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Modal, Button, Checkbox, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectIsCreationMode,
  setActiveTab,
  setEstadisticaDatos,
  setEstadisticaFields,
} from '../EstadisticaFormSlice';
import DataRangeConfirmDialog, {
  DataRangeConfirmDialogRef,
} from '../../../components/chart/DataRangeConfirmDialog';
import { CellRange } from '../../../types/CellRange';
import { useGetIndiceClasificadoresQuery } from '../../../app/services/clasificador';
import { IndiceClasificadores } from '../../../core/IndiceClasificadores';
import { EstadisticasWorkbook } from '../../../core/EstadisticasWorkbook';

export interface EstadisticaImportWindowProps {}
export interface EstadisticaImportWindowDataInput {
  estadisticasWb: EstadisticasWorkbook;
}
export interface EstadisticaImportWindowRef {
  open: (data: EstadisticaImportWindowProps) => void;
  close: () => void;
}
const EstadisticaImportWindow = forwardRef<
  EstadisticaImportWindowRef,
  EstadisticaImportWindowProps
>((props, ref) => {
  const dispath = useAppDispatch();
  const [estadisticasWb, setEstadisticasWb] =
    useState<EstadisticasWorkbook>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const isCreationMode = useAppSelector(selectIsCreationMode);
  const [camposFichaSheetName, setCamposFichaSheetName] =
    useState<string>(null);

  const [tablaDatosSheetName, setTablaDatosSheetName] = useState<string>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [camposFichaChecked, setCamposFichaChecked] = useState(false);
  const [tablaDatosChecked, setTablaDatosChecked] = useState(false);
  const { data: clasificadores } = useGetIndiceClasificadoresQuery();
  const indiceClasificadores = new IndiceClasificadores(clasificadores || []);
  const importButtonTitle = isCreationMode ? 'Importar' : 'Actualizar datos';
  const importModalTitle = importButtonTitle;
  const confirmDataRangeDialogRef = useRef<DataRangeConfirmDialogRef>(null);
  const open = ({ estadisticasWb }: EstadisticaImportWindowDataInput) => {
    setEstadisticasWb(estadisticasWb);
    setSheetNames(estadisticasWb.getSheetNames());
    setIsModalOpen(true);
  };

  const close = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    open,
    close,
  }));
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
    if (camposFichaChecked) {
      const camposFichaTecnica = estadisticasWb.getCamposFichaTecnica(
        camposFichaSheetName,
        indiceClasificadores
      );
      dispath(setEstadisticaFields(camposFichaTecnica));
    }
  };
  const extractTablaDatos = (range: CellRange) => {
    const datos = estadisticasWb.getSheetCellsRange(tablaDatosSheetName, range);
    const caposTablaDatos =
      estadisticasWb.getCamposTablaDatos(tablaDatosSheetName);
    dispath(setEstadisticaFields(caposTablaDatos));
    dispath(setEstadisticaDatos(datos));
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
    const sheetDataMap = estadisticasWb.getSheetDataMap(tablaDatosSheetName);
    const sheetData = estadisticasWb.getCellsMatrix(
      sheetDataMap,
      tablaDatosSheetName
    );
    const rangoTablaDatos =
      estadisticasWb.determinarRangoDatos(tablaDatosSheetName);
    confirmDataRangeDialogRef.current.open({
      data: sheetData,
      dataSelectionRange: rangoTablaDatos,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetState();
  };
  const resetState = () => {
    setCamposFichaChecked(false);
    setTablaDatosChecked(false);
  };
  const modalStyles = {
    footer: {
      display: 'flex',
    },
  };
  return (
    <>
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
              value={tablaDatosSheetName}
              disabled={!tablaDatosChecked}
              style={{ width: '100px' }}
              options={sheetNames.map((sheet) => ({
                label: sheet,
                value: sheet,
              }))}
              size="small"
              onChange={(value) => {
                setTablaDatosSheetName(value);
                setCamposFichaSheetName(value + 1);
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
              value={camposFichaSheetName}
              disabled={!camposFichaChecked}
              style={{ width: '100px' }}
              options={sheetNames.map((sheet) => ({
                label: sheet,
                value: sheet,
              }))}
              size="small"
              onChange={(value) => {
                setCamposFichaSheetName(value);
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
});

export default EstadisticaImportWindow;
