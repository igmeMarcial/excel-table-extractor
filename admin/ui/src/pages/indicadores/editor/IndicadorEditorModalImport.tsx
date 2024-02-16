import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { ArrowImport24Regular } from '@fluentui/react-icons';
import EditorSingleFileUploader from './EditorSingleFileUploader';
interface IndicadorEditorModalImportProps {
  onTableData?: any;
  setTabActiveKey: (newKey: string) => void;
}

const IndicadorEditorModalImport: React.FC<IndicadorEditorModalImportProps> = ({
  onTableData,setTabActiveKey
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [uploadFileLoading, setUploadFileLoading] = useState<boolean>(false);
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    onTableData(tableData);
    setUploadFileLoading(false);
    setOption1(false); // Reiniciar estado de los checkboxes
    setOption2(false);
    setFiles(false);
    setTabActiveKey("2")
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

  const modalStyles = {
    footer: {
      display: 'flex',
    },
  };
  return (
    <>
      <Button
        type="text"
        icon={<ArrowImport24Regular className="align-middle" />}
        onClick={showModal}
      >
        Actualizar desde ficha técnica
      </Button>
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
          option1={option1}
          setOption1={setOption1}
          option2={option2}
          setOption2={setOption2}
          setFiles={setFiles}
        />
      </Modal>
    </>
  );
};

export default IndicadorEditorModalImport;
