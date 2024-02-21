import React, { useState } from 'react';
import IndicatorEditorTabPresentationLeft from './presentacion/IndicatorEditorTabPresentationLeft';
import IndicatorEditorTabPresentationRight from './presentacion/IndicatorEditorTabPresentationRight';
import { use } from 'echarts';

interface IndicadorEditorTabPresentacionProps{
  tableData: any
}

const IndicadorEditorTabPresentacion: React.FC<IndicadorEditorTabPresentacionProps> =({tableData})=> {

  const [typeGraph,setTypeGraph] = useState<string>(null)


  const handleTypeGraph = (key:any)=>{
    setTypeGraph(key)
  }
  return (
    <div
      className="flex flex-row overflow-auto scroll-container"
      style={{ height: '380px' }}
    >
      
        <IndicatorEditorTabPresentationLeft tableData={tableData} onTypeGraph={handleTypeGraph}/>
      <IndicatorEditorTabPresentationRight tyGraph={typeGraph} />
      
    </div>
  );
}

export default IndicadorEditorTabPresentacion;
