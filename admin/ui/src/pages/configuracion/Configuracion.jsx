import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import ExtractDataTest from './ExtractDataTest';

function Configuracion() {
  return (
    <MainLayout>
      <div>
        <h3>Configuration page</h3>
        <ExtractDataTest />
      </div>
    </MainLayout>
  );
}

export default Configuracion;
