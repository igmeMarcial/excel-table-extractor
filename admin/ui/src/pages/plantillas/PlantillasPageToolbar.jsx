import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBox from '../../components/SearchBox';
import UploadFileButton from '../../components/UploadFileButton';

function PlantillasPageToolbar({ onSearchBoxChange, onFileUploaded }) {
  const [fileUploading, setFileUploading] = useState(false);
  const handlerSearchChange = (event) => {
    onSearchBoxChange(event);
  };

  // Handle file change
  const handleFileChange = (file) => {
    if (!file) return;
    setFileUploading(true);
    PlantillaRestService.upload(file)
      .then((_) => {
        setFileUploading(false);
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

  return (
    <div className="flex px-10 pt-6 pb-4 gap-2">
      <SearchBox onChange={handlerSearchChange} />
      <span className="flex-1"></span>
      <UploadFileButton
        text="Subir plantilla"
        accept=".docx"
        onFileChange={handleFileChange}
        uploading={fileUploading}
      />
    </div>
  );
}

PlantillasPageToolbar.propTypes = {
  onSearchBoxChange: PropTypes.func,
  onFileUploaded: PropTypes.func,
};
PlantillasPageToolbar.defaultProps = {
  onSearchBoxChange: () => {},
  onFileUploaded: () => {},
};

export default PlantillasPageToolbar;
