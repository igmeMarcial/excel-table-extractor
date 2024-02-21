import React, { useState } from 'react';
import MainLayout from '../../../layout/MainLayout';
import IndicadorEditorhHeader from './IndicadorEditorhHeader';
import IndicadorEditorTabs from './IndicadorEditorTabs';
import IndicadorEditorBottomActions from './IndicadorEditorBottomActions';
import { useGetEstadisticaQuery } from '../../../app/services/estadistica';

function IndicadorEditorPage() {
  // Get data from the API
  // const { data, error, isLoading } = useGetEstadisticaQuery(1);
  return (
    <MainLayout>
      <IndicadorEditorhHeader/>
      <div className="px-12 ">
        <IndicadorEditorTabs />
      </div>

      <IndicadorEditorBottomActions />
    </MainLayout>
  );
}

export default IndicadorEditorPage;
