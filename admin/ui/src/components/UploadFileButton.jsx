import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { ArrowUpload24Filled } from '@fluentui/react-icons';

function UploadFileButton({
  text,
  uploadingText,
  accept,
  uploading,
  onFileChange,
}) {
  // File input element reference
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    fileInputRef.current.value = null;
    onFileChange(file);
  };
  const onClickTrigger = () => {
    fileInputRef.current.click();
  };
  return (
    <>
      <input
        className="hidden"
        type="file"
        onChange={handleFileChange}
        accept={accept}
        ref={fileInputRef}
      />
      <Button
        type="text"
        onClick={onClickTrigger}
        icon={<ArrowUpload24Filled className="w-5 align-middle" />}
        loading={uploading}
      >
        {uploading ? uploadingText : text}
      </Button>
    </>
  );
}

UploadFileButton.propTypes = {
  text: PropTypes.string,
  uploadingText: PropTypes.string,
  uploading: PropTypes.bool,
  accept: PropTypes.string,
  onFileChange: PropTypes.func,
};
UploadFileButton.defaultProps = {
  text: 'Subir archivo',
  uploading: false,
  uploadingText: 'Subiendo...',
  accept: '*',
  onFileChange: () => {},
};

export default UploadFileButton;
