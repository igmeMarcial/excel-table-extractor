import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DocumentOnePageSparkle20Regular } from '@fluentui/react-icons';
import SearchBox from '../../components/SearchBox';
import UploadFileButton from '../../components/UploadFileButton';
import AnuarioRestService from '../../services/AnuarioRestService';
import { Button } from 'antd';

function AnuariosPageToolbar({
  onSearchBoxChange,
  onFileUploaded,
  onFileGenerated,
}) {
  const [fileUploading, setFileUploading] = useState(false);
  const [construyendoVersionBase, setConstruyendoVersionBase] = useState(false);
  const handlerSearchChange = (event) => {
    onSearchBoxChange(event);
  };

  // Handle file change
  const handleFileChange = (file) => {
    if (!file) return;
    setFileUploading(true);
    AnuarioRestService.upload(file)
      .then((_) => {
        onFileUploaded({
          name: file.name,
          size: file.size,
          modified: file.lastModified,
        });
      })
      .finally(() => {
        setFileUploading(false);
      });
  };

  const handleGenerarVerionBase = () => {
    setConstruyendoVersionBase(true);
    AnuarioRestService.generarVersionBase()
      .then(() => {
        onFileGenerated();
      })
      .finally(() => {
        setConstruyendoVersionBase(false);
      });
  };

  return (
    <div className="flex px-10 pt-6 pb-4 gap-2">
      <SearchBox onChange={handlerSearchChange} />
      <span className="flex-1"></span>
      <Button
        type="text"
        icon={<DocumentOnePageSparkle20Regular className="align-middle" />}
        loading={construyendoVersionBase}
        onClick={handleGenerarVerionBase}
      >
        Generar vesión base
      </Button>
      <UploadFileButton
        text="Subir anuario"
        accept=".pdf"
        onFileChange={handleFileChange}
        uploading={fileUploading}
      />
    </div>
  );
}

AnuariosPageToolbar.propTypes = {
  onSearchBoxChange: PropTypes.func,
  onFileUploaded: PropTypes.func,
  onFileGenerated: PropTypes.func,
};
AnuariosPageToolbar.defaultProps = {
  onSearchBoxChange: () => {},
  onFileUploaded: () => {},
  onFileGenerated: () => {},
};

export default AnuariosPageToolbar;
