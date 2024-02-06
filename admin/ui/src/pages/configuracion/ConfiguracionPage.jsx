import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import ConfiguracionMain from './ConfiguracionMain';
import ConfiguracionBottomActions from './ConfiguracionBottomActions';

function ConfiguracionPage() {
  return (
    <MainLayout>
      <ConfiguracionMain />
      <ConfiguracionBottomActions />
    </MainLayout>
  );
}

export default ConfiguracionPage;
