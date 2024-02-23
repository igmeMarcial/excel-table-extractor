import React from 'react';
import TipoGraficoSelect from './TipoGraficoSelect';
import PresentationSeriesStacked from './PresentationSeriesStacked';
import PresentationSeriesConfiguration from './PresentationSeriesConfiguration';



const IndicatorEditorTabPresentationLeft: React.FC = () => {
  return (
    <div className='w-2/5'>
      <TipoGraficoSelect />
      <PresentationSeriesStacked />
      <PresentationSeriesConfiguration/>
    </div>
  );
};

export default IndicatorEditorTabPresentationLeft;
