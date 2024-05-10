import React, { useRef } from 'react';
import MainLayout from '../../layout/MainLayout';
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

  //
  return (
    <MainLayout>
      <AnuariosPageToolbar
        onSearchBoxChange={handleSearchBoxChange}
        onFileUploaded={handleUpload}
      />
      <AnuariosPageList ref={listRef} />
    </MainLayout>
  );
}

export default AnuariosPage;
