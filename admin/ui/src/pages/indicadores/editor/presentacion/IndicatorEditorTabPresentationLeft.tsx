import React from 'react';
import TipoGraficoSelect from './TipoGraficoSelect';
import PresentationSeriesStacked from './PresentationSeriesStacked';
import PresentationSeriesConfiguration from './PresentationSeriesConfiguration';

interface IndicatorEditorTabPresentationLeftProps {
  tableData: any;
  onTypeGraph: any;
}

const IndicatorEditorTabPresentationLeft: React.FC<
  IndicatorEditorTabPresentationLeftProps
> = ({ tableData }) => {
  return (
    <div className="border border-red-600">
      <TipoGraficoSelect />
      <PresentationSeriesStacked />
      <PresentationSeriesConfiguration tableData={tableData} />
    </div>
  );
};

export default IndicatorEditorTabPresentationLeft;
