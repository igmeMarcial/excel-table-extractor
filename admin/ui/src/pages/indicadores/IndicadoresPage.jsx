import React from 'react';
import MainLayout from '../../layout/MainLayout';
import Toolbar from './Toolbar';
import IndicadorList from './IndicadorList';

function IndicadoresPage() {
  return (
    <MainLayout>
      <Toolbar />
      <IndicadorList />
    </MainLayout>
  );
}

export default IndicadoresPage;
