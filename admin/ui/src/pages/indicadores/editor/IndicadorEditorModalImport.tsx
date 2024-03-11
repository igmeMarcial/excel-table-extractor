import { forwardRef, useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import EditorSingleFileUploader from './EditorSingleFileUploader';
import { useAppDispatch } from '../../../app/hooks';
import {
  setActiveTab,
  setEstadisticaDatos,
  setEstadisticaFields,
} from '../EstadisticaFormSlice';
import { WorkBook } from 'xlsx';
type IndicadorEditorModalImportProps = {
  title: string;
  hasFile: boolean;
  setHasFile: any;
  titleIndicador: string;
  workBook: WorkBook;
};
const IndicadorEditorModalImport = forwardRef(
  (
    {
      title,
      hasFile,
      setHasFile,
      titleIndicador,
      workBook,
    }: IndicadorEditorModalImportProps,
    ref
  ) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [files, setFiles] = useState(false);
    const [tableData, setTableData] = useState(null);
    const [indicadorData, setIndicadorData] = useState(null);
    const [option1, setOption1] = useState(false);
    const [option2, setOption2] = useState(false);
    const dispath = useAppDispatch();

    useEffect(() => {
      if (hasFile) {
        setIsModalOpen(true);
      }
    }, [hasFile]);

    const handleOk = () => {
      setIsModalOpen(false);
      if (option1 && option2) {
        dispath(setEstadisticaDatos(tableData));
        dispath(setEstadisticaFields(indicadorData));
      } else if (option1) {
        dispath(setEstadisticaFields(indicadorData));
      } else if (option2) {
        dispath(setEstadisticaDatos(tableData));
      }
      setHasFile(false);
      setOption1(false);
      setOption2(false);
      setFiles(false);
      let activeTabValue: string;
      if (option1) {
        activeTabValue = '1';
      } else if (option2) {
        activeTabValue = '2';
      } else {
        activeTabValue = '1'; // Valor por defecto si ninguna opción está seleccionada
      }
      dispath(setActiveTab(activeTabValue));
    };
    const handleCancel = () => {
      setIsModalOpen(false);
      setHasFile(false);
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
        title={title}
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
          onTableData={handleTableData}
          onIndicatorData={handleIndicatorData}
          option1={option1}
          setOption1={setOption1}
          option2={option2}
          setOption2={setOption2}
          setFiles={setFiles}
          titleIndicador={titleIndicador}
          workBook={workBook}
          hasFile={hasFile}
        />
      </Modal>
    );
  }
);

export default IndicadorEditorModalImport;
