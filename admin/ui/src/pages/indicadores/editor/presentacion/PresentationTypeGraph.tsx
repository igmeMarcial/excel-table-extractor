import React, { useState } from 'react';
import { Button } from '@fluentui/react-components';
import {
  DataBarVertical24Regular,
  DataBarHorizontal24Regular,
  DataLine24Regular,
  DataArea24Regular,
  DataPie24Regular,
} from '@fluentui/react-icons';
const PresentationTypeGraph: React.FC = () => {
  
  const [selectGraph,setSelectedGraph] = useState(null)

  const handleChange = (graphType: string)=>{
    setSelectedGraph(graphType);
  }

  return (
    <div>
      <p>Tipo de gráfico</p>
      <div className="flex gap-3">
        <Button appearance="subtle" icon={<DataBarVertical24Regular />} onClick={()=>handleChange('verticalBar')}/>
        <Button appearance="subtle" icon={<DataBarHorizontal24Regular />} onClick={()=>handleChange('horizontalBar')} />
        <Button appearance="subtle" icon={<DataLine24Regular />}  onClick={()=>handleChange('line')}/>
        <Button appearance="subtle" icon={<DataArea24Regular />} onClick={()=>handleChange('area')} />
        <Button appearance="subtle" icon={<DataPie24Regular />}  onClick={()=>handleChange('pie')}/>
      </div>
    </div>
  );
}

export default PresentationTypeGraph;
