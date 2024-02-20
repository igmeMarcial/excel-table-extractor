import React, { useState } from 'react';
import { Button,makeStyles } from '@fluentui/react-components';
import {
  DataBarVertical24Regular,
  DataBarHorizontal24Regular,
  DataLine24Regular,
  DataArea24Regular,
  DataPie24Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  active: { backgroundColor: '#E6E6E6' },
});

interface PresentationTypeGraphProps{
  onTypeGraph: any,
}

const PresentationTypeGraph: React.FC<PresentationTypeGraphProps> = ({onTypeGraph}) => {
  const classes = useStyles();
  const [selectGraph,setSelectedGraph] = useState('verticalBar')

  const handleChange = (graphType: string)=>{
    setSelectedGraph(graphType);
    onTypeGraph(graphType)
  }

  return (
    <div>
      <p>Tipo de gráfico</p>
      <div className="flex gap-3">
        <Button className={selectGraph === 'verticalBar' ? classes.active : ''} appearance="subtle" icon={<DataBarVertical24Regular />} onClick={()=>handleChange('verticalBar')}/>
        <Button className={selectGraph === 'horizontalBar' ? classes.active : ''} appearance="subtle" icon={<DataBarHorizontal24Regular />} onClick={()=>handleChange('horizontalBar')} />
        <Button className={selectGraph === 'line' ? classes.active : ''} appearance="subtle" icon={<DataLine24Regular />}  onClick={()=>handleChange('line')}/>
        <Button className={selectGraph === 'area' ? classes.active : ''} appearance="subtle" icon={<DataArea24Regular />} onClick={()=>handleChange('area')} />
        <Button className={selectGraph === 'pie' ? classes.active : ''} appearance="subtle" icon={<DataPie24Regular />}  onClick={()=>handleChange('pie')}/>
      </div>
    </div>
  );
}

export default PresentationTypeGraph;
