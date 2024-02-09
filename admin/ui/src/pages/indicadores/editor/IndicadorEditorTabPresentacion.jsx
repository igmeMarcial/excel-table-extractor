import React from 'react';
import IndicatorEditorTabPresentationLeft from './presentacion/IndicatorEditorTabPresentationLeft';
import IndicatorEditorTabPresentationRight from './presentacion/IndicatorEditorTabPresentationRight';

function IndicadorEditorTabDatos() {
  return (
    <div
      className="flex flex-row overflow-auto scroll-container"
      style={{ height: '380px' }}
    >
      <IndicatorEditorTabPresentationLeft />
      <IndicatorEditorTabPresentationRight />
    </div>
  );
}

export default IndicadorEditorTabDatos;
