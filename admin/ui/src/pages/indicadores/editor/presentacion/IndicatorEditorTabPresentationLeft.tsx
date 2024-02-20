import React from 'react';
import PresentationTypeGraph from './PresentationTypeGraph';
import PresentationSeriesStacked from './PresentationSeriesStacked';
import PresentationSeriesConfiguration from './PresentationSeriesConfiguration';

interface IndicatorEditorTabPresentationLeftProps{
  tableData: any,
  onTypeGraph: any
}

const IndicatorEditorTabPresentationLeft: React.FC<IndicatorEditorTabPresentationLeftProps> = ({tableData,onTypeGraph}) =>  {

  const handleTypeGraph=(key:string)=>{
    onTypeGraph(key)
  }
  return (
    <div className="border border-red-600 w-full">
      <PresentationTypeGraph />
      <PresentationSeriesStacked />
      <PresentationSeriesConfiguration tableData={tableData}/>
    </div>
  );
}

export default IndicatorEditorTabPresentationLeft;
