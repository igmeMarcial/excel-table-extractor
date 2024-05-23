import { useState, ChangeEvent } from 'react';
import SearchBox from '../../components/SearchBox';
import UploadFileButton from '../../components/UploadFileButton';
import AnuarioRestService from '../../services/AnuarioRestService';

interface AnuariosPageToolbarProps {
  onSearchBoxChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFileUploaded?: (fileInfo: {
    name: string;
    size: number;
    modified: number;
  }) => void;
}

const AnuariosPageToolbar = ({
  onSearchBoxChange = () => {},
  onFileUploaded = () => {},
}: AnuariosPageToolbarProps) => {
  const [fileUploading, setFileUploading] = useState(false);

  const handlerSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onSearchBoxChange) {
      onSearchBoxChange(event);
    }
  };

  // Handle file change
  const handleFileChange = (file: File | null) => {
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

  return (
    <div className="flex px-10 pt-6 pb-4 gap-2">
      <SearchBox onChange={handlerSearchChange} />
      <span className="flex-1"></span>
      <UploadFileButton
        text="Subir anuario"
        accept=".pdf"
        onFileChange={handleFileChange}
        uploading={fileUploading}
      />
    </div>
  );
};

export default AnuariosPageToolbar;
