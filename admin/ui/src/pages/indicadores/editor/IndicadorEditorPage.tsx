import React, { useRef, useState } from 'react';
import MainLayout from '../../../layout/MainLayout';
import IndicadorEditorhHeader from './IndicadorEditorhHeader';
import IndicadorEditorTabs from './IndicadorEditorTabs';
import IndicadorEditorBottomActions from './IndicadorEditorBottomActions';

interface Estadistica {
  [key: string]: any; 
}

function IndicadorEditorPage() {
  const [estadistica, setEstadistica] = useState({});

  const handleTabFichaDataChange = (values: Estadistica) => {
    setEstadistica((prevEstadistica) => {
      return { ...prevEstadistica, ...values };
    });
  };
  const handleTabDataChange = (tab: string, values: Estadistica) => {
    if (tab === 'ficha') {
      handleTabFichaDataChange(values);
    }
  };

  return (
    <MainLayout>
      <IndicadorEditorhHeader estadistica={estadistica} />
      <div className="px-12 ">
        <IndicadorEditorTabs onTabDataChange={handleTabDataChange} />
      </div>

      <IndicadorEditorBottomActions estadistica={estadistica} />
    </MainLayout>
  );
}

export default IndicadorEditorPage;
