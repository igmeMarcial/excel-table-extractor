import React from 'react';
import IndicatorEditorTabPresentationLeft from './presentacion/IndicatorEditorTabPresentationLeft';
import IndicatorEditorTabPresentationRight from './presentacion/IndicatorEditorTabPresentationRight';

function IndicadorEditorTabDatos() {
  return (
    <div className="flex flex-row">
      <IndicatorEditorTabPresentationLeft />
      <IndicatorEditorTabPresentationRight />
    </div>
  );
}

export default IndicadorEditorTabDatos;
