import React, { useMemo, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import ToolbarAnuario from './ToolbarAnuario';
import AnuariosList from './AnuariosList';

function Anuarios() {
  return (
    <MainLayout>
      <ToolbarAnuario />
      <AnuariosList />
    </MainLayout>
  );
}

export default Anuarios;
