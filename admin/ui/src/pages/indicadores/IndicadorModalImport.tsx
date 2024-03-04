import { useState } from 'react';
import { Modal, Button } from 'antd';
import { ArrowImport24Regular } from '@fluentui/react-icons';
import MultipleFileUploader from './IndicadorMultipleFileUploader';

const IndicadorModalImport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasFiles, setHasFiles] = useState(false);
  const [files, setFiles] = useState<[] | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log('Post:');
    console.log(files);
    setIsModalOpen(false);
    setHasFiles(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setHasFiles(false);
  };
  const handleFiles = (archivos: []) => {
    setFiles(archivos);
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
        Importar
      </Button>
      <Modal
        title="Importar indicadores"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        styles={modalStyles}
        width={700}
        footer={[
          <Button
            disabled={!hasFiles}
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
        <MultipleFileUploader
          setHasFiles={setHasFiles}
          hasFiles={hasFiles}
          onFiles={handleFiles}
        />
      </Modal>
    </>
  );
};

export default IndicadorModalImport;
