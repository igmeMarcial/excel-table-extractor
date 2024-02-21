import { forwardRef, useState, useImperativeHandle } from 'react';
import { Modal, Button } from 'antd';
import EditorSingleFileUploader from './EditorSingleFileUploader';
import { useAppDispatch } from '../../../app/hooks';
import {
  setActiveTab,
  setEstadisticaExcelDataTable,
  setEstadisticaExcelIndicator,
} from '../EstadisticaFormSlice';
interface IndicadorEditorModalImportProps {
  onTableData?: any;
}
const IndicadorEditorModalImport = forwardRef(
  ({ onTableData }: IndicadorEditorModalImportProps, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [files, setFiles] = useState(false);
    const [tableData, setTableData] = useState(null);
    const [indicadorData, setIndicadorData] = useState(null);
    const [uploadFileLoading, setUploadFileLoading] = useState<boolean>(false);
    const [option1, setOption1] = useState(false);
    const [option2, setOption2] = useState(false);
    const dispath = useAppDispatch();

    const open = () => {
      setIsModalOpen(true);
    };
    // Expose the custom method to the parent component
    useImperativeHandle(ref, () => ({
      open,
    }));
    const handleOk = () => {
      setIsModalOpen(false);
      dispath(setEstadisticaExcelDataTable(tableData));
      dispath(setEstadisticaExcelIndicator(indicadorData));
      setUploadFileLoading(false);
      setOption1(false);
      setOption2(false);
      setFiles(false);
      dispath(setActiveTab(option1 ? '1' : option2 ? '2' : '1'));
    };
    const handleCancel = () => {
      setIsModalOpen(false);
      setUploadFileLoading(false);
      setOption1(false); // Reiniciar estado de los checkboxes
      setOption2(false);
      setFiles(false);
    };

    const handleTableData = (values) => {
      if (values) {
        setTableData(values);
        setFiles(true);
      }
    };
    const handleIndicatorData = (values) => {
      if (values) {
        setIndicadorData(values);
      }
    };

    const modalStyles = {
      footer: {
        display: 'flex',
      },
    };
    return (
      <Modal
        title="Importar ficha tecnica"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        styles={modalStyles}
        width={700}
        footer={[
          <Button
            disabled={!files && !option1 && !option2}
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
        <EditorSingleFileUploader
          uploadFile={uploadFileLoading}
          setUploadFile={setUploadFileLoading}
          onTableData={handleTableData}
          onIndicatorData={handleIndicatorData}
          option1={option1}
          setOption1={setOption1}
          option2={option2}
          setOption2={setOption2}
          setFiles={setFiles}
        />
      </Modal>
    );
  }
);

export default IndicadorEditorModalImport;
