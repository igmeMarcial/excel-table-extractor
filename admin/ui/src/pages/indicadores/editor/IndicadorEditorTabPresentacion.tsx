import React from 'react';
import IndicatorEditorTabPresentationLeft from './presentacion/IndicatorEditorTabPresentationLeft';
import IndicatorEditorTabPresentationRight from './presentacion/IndicatorEditorTabPresentationRight';

interface IndicadorEditorTabPresentacionProps{
  tableData: any
}

const IndicadorEditorTabPresentacion: React.FC<IndicadorEditorTabPresentacionProps> =({tableData})=> {


  const handleTypeGraph = (key:any)=>{
    console.log(key)
  }
  return (
    <div
      className="flex flex-row overflow-auto scroll-container"
      style={{ height: '380px' }}
    >
      <IndicatorEditorTabPresentationLeft tableData={tableData} onTypeGraph={handleTypeGraph}/>
      <IndicatorEditorTabPresentationRight />
    </div>
  );
}

export default IndicadorEditorTabPresentacion;
