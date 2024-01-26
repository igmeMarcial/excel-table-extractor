import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { columnsTestPlantilla } from '../../utils/data';
import PlantillaList from './PlantillaList';

import ToolbarPlantilla from './ToolbarPlantilla';

function Plantillas() {
  const [value, setValue] = useState('');
  return (
    <MainLayout>
      <ToolbarPlantilla />
      <PlantillaList columns={columnsTestPlantilla} />
    </MainLayout>
  );
}

export default Plantillas;
