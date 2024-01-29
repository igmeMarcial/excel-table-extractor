import React, { useRef } from 'react';
import MainLayout from '../../layout/MainLayout';
import { columnsTestPlantilla } from '../../utils/data';
import AnuariosPageList from './AnuariosPageList';

import AnuariosPageToolbar from './AnuariosPageToolbar';

function AnuariosPage() {
  const listRef = useRef(null);
  const handleSearchBoxChange = (value) => {
    listRef.current.filterRecords(value);
  };
  const handleUpload = (data) => {
    listRef.current.addRecord(data);
  };
  const handleFileGenerated = () => {
    listRef.current.refresh();
  };
  //
  return (
    <MainLayout>
      <AnuariosPageToolbar
        onSearchBoxChange={handleSearchBoxChange}
        onFileUploaded={handleUpload}
        onFileGenerated={handleFileGenerated}
      />
      <AnuariosPageList ref={listRef} columns={columnsTestPlantilla} />
    </MainLayout>
  );
}

export default AnuariosPage;
