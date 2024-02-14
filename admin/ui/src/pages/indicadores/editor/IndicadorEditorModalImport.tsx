import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { ArrowImport24Regular } from '@fluentui/react-icons';
import EditorSingleFileUploader from './EditorSingleFileUploader';
interface IndicadorEditorModalImportProps{
  onTableData?: any;
}

const IndicadorEditorModalImport: React.FC<IndicadorEditorModalImportProps> = ({onTableData}) => { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState(true);
  const[tableData,setTableData] = useState(null)
const [uploadFileLoading,setUploadFileLoading]  = useState<boolean>(false)

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    onTableData(tableData)
    setUploadFileLoading(false)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
     setUploadFileLoading(false)
  };
  
  const handleTableData=(values)=>{
    if(values){
    setTableData(values)
    setFiles(false)
    }  
  }

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
            disabled={files}
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
        <EditorSingleFileUploader uploadFile={uploadFileLoading} setUploadFile={setUploadFileLoading} onTableData={handleTableData}/>
      </Modal>
    </>
  );
}


export default IndicadorEditorModalImport;
