import React from 'react';
import IndicatorEditorTabPresentationLeft from './presentacion/IndicatorEditorTabPresentationLeft';
import Grafico from './presentacion/Grafico';
import { use } from 'echarts';

const IndicadorEditorTabPresentacion: React.FC = () => {
  return (
    <div className="flex overflow-y-auto " style={{ height: '380px' }}>
      <IndicatorEditorTabPresentationLeft />
      <Grafico />
    </div>
  );
};

export default IndicadorEditorTabPresentacion;
