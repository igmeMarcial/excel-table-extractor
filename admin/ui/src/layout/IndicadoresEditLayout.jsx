import React from 'react';
import MenuIndicadores from '../components/MenuIndicadores';

function IndicadoresEditLayout({ children }) {
  return (
    <>
      <MenuIndicadores />
      {children}
    </>
  );
}

export default IndicadoresEditLayout;
