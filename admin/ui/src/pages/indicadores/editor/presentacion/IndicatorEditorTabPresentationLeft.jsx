import React from 'react';
import PresentationTypeGraph from './PresentationTypeGraph';
import PresentationSeriesStacked from './PresentationSeriesStacked';
import PresentationSeriesConfiguration from './PresentationSeriesConfiguration';

function IndicatorEditorTabPresentationLeft() {
  return (
    <div className="border border-red-600 w-full">
      <PresentationTypeGraph />
      <PresentationSeriesStacked />
      <PresentationSeriesConfiguration />
    </div>
  );
}

export default IndicatorEditorTabPresentationLeft;
