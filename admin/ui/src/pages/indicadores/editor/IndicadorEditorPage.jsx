import React from 'react';
import MainLayout from '../../../layout/MainLayout';
import IndicadorEditorhHeader from './IndicadorEditorhHeader';
import IndicadorEditorTabs from './IndicadorEditorTabs';
import IndicadorEditorBottomActions from './IndicadorEditorBottomActions';

function IndicadorEditorPage() {
  return (
    <MainLayout>
      <IndicadorEditorhHeader />
      <IndicadorEditorTabs />
      <IndicadorEditorBottomActions />
    </MainLayout>
  );
}

export default IndicadorEditorPage;
