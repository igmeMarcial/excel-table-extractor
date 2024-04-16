import { useRef } from 'react';
import { Button } from 'antd';
import { ArrowImport24Regular } from '@fluentui/react-icons';

interface SelectFileButtonProps {
  text: string;
  loadingText?: string;
  loading: boolean;
  accept: string;
  onFileChange: (file: File) => void;
}

function SelectFileButton({
  text,
  loadingText,
  accept,
  loading: uploading,
  onFileChange,
}: SelectFileButtonProps) {
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
        icon={<ArrowImport24Regular className="w-5 align-middle" />}
        loading={uploading}
      >
        {uploading ? loadingText || text : text}
      </Button>
    </>
  );
}

export default SelectFileButton;
