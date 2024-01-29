import React from 'react';
import MainLayout from '../../layout/MainLayout';
import Toolbar from './Toolbar';
import IndicadoresPageList from './IndicadoresPageList';

function IndicadoresPage() {
  return (
    <MainLayout>
      <Toolbar />
      <IndicadoresPageList />
    </MainLayout>
  );
}

export default IndicadoresPage;
