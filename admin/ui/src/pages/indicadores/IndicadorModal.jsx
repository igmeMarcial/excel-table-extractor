import React, { useState } from 'react';
import { Modal } from 'antd';
import { Button } from '@fluentui/react-components';
import { ArrowImport24Regular } from '@fluentui/react-icons';

function IndicadorModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        size="medium"
        appearance="subtle"
        icon={<ArrowImport24Regular className="" />}
        onClick={showModal}
      >
        Importar
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleOk}
            defaultBg="#B8B8B8"
          >
            Importar
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default IndicadorModal;
