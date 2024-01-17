import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { columnsTestPlantilla } from '../../utils/data';
import PlantillaList from './PlantillaList';
import { SearchInput } from '../../components/SearchInput';

function Plantillas() {
  const [value, setValue] = useState('');
  return (
    <MainLayout>
      <SearchInput
        type="search"
        label="inputPlantilla"
        value={value}
        name="inputPlantilla"
        placeholder="Buscar"
        error={false}
        disabled={false}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        isAnuario={false}
      />
      <PlantillaList columns={columnsTestPlantilla} />
    </MainLayout>
  );
}

export default Plantillas;
