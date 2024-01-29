import React, { useRef } from 'react';
import MainLayout from '../../layout/MainLayout';
import { columnsTestPlantilla } from '../../utils/data';
import PlantillasPageList from './PlantillasPageList';

import PlantillasPageToolbar from './PlantillasPageToolbar';

function PlantillasPage() {
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
      <PlantillasPageToolbar
        onSearchBoxChange={handleSearchBoxChange}
        onFileUploaded={handleUpload}
      />
      <PlantillasPageList ref={listRef} columns={columnsTestPlantilla} />
    </MainLayout>
  );
}

export default PlantillasPage;
