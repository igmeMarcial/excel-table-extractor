import React, { useState } from 'react';
import PresentationSeriesConfigurationList from './PresentationSeriesConfigurationList';
import { indicadorData } from '../../../../mock/indicadorData';
import { getChartColors } from '../../../../utils/colors';
import chroma from 'chroma-js';
interface PresentationSeriesConfigurationProps {
  tableData: any
}

const PresentationSeriesConfiguration: React.FC<PresentationSeriesConfigurationProps> = ({tableData}) => {
  const [nameColumnData, setNameColumnData] = useState(indicadorData);
  const [colors, setColors] = useState(getChartColors);
  
//  if(tableData.tableData && tableData.tableData.length > 0){
//   console.log(tableData)
//  }else{
//   console.log("todavia no hay datos")
//  }
 let number = 1;
  const getColor = (index:number, colors:string[]) => {
    if (index < colors.length) {
      return colors[index];
    } else {
      const baseColor = colors[index % colors.length];
      const darkenedColor = chroma(baseColor).darken();
      return darkenedColor.hex();
    }
  };
    const getNumber = () => {
     return number++; // 
  };

  return (
    <div>
      <p>Configuracion de series</p>
      <div className="w-11/12 bg-white rounded-lg  my-5 ">
        <div className="flex-1 ">
          {nameColumnData?.slice(1).map((item, index) => (
            <PresentationSeriesConfigurationList
              key={item[0]}
              nombre={String(item[0])}
              color={getColor(index, colors)}
              number={getNumber()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PresentationSeriesConfiguration;
