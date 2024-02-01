import React, { useRef, useState } from 'react';
import MainLayout from '../../../layout/MainLayout';
import IndicadorEditorhHeader from './IndicadorEditorhHeader';
import IndicadorEditorTabs from './IndicadorEditorTabs';
import IndicadorEditorBottomActions from './IndicadorEditorBottomActions';

function IndicadorEditorPage() {
  const [estadistica, setEstadistica] = useState({});

  const refHeader = useRef(null);
  const refAccions = useRef(null);
  const refTabs = useRef(null);

  const handleTabFichaDataChange = (values) => {
    setEstadistica((prevEstadistica) => {
      return { ...prevEstadistica, ...values };
    });
    // console.log(estadistica);
  };
  const handleTabDataChange = (tab, values) => {
    if (tab === 'ficha') {
      handleTabFichaDataChange(values);
    }
  };

  return (
    <MainLayout>
      <IndicadorEditorhHeader estadistica={estadistica} />
      <IndicadorEditorTabs onTabDataChange={handleTabDataChange} />
      <IndicadorEditorBottomActions estadistica={estadistica} />
    </MainLayout>
  );
}

export default IndicadorEditorPage;
