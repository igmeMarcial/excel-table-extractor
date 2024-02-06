import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { ArrowImport24Regular } from '@fluentui/react-icons';
import EditorSingleFileUploader from './EditorSingleFileUploader';

function IndicadorEditorModalImport() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleFileChange = (files) => {
    console.log(files);
    setFiles(files);
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
        <EditorSingleFileUploader />
      </Modal>
    </>
  );
}

export default IndicadorEditorModalImport;
