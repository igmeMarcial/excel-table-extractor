import React from 'react';
import MainLayout from '../../layout/MainLayout';
import IndicadoresPageList from './IndicadoresPageList';
import IndicadoresPageToolbar from './IndicadoresPageToolbar';

function IndicadoresPage() {
  return (
    <MainLayout>
      <IndicadoresPageToolbar />
      <IndicadoresPageList />
    </MainLayout>
  );
}

export default IndicadoresPage;
