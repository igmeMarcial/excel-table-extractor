import React, { useState } from 'react';
import PresentationSeriesConfigurationList from './PresentationSeriesConfigurationList';
import { indicadorData } from '../../../../mock/indicadorData';
import { getChartColors } from '../../../../utils/colors';
import chroma from 'chroma-js';

function PresentationSeriesConfiguration() {
  const [nameColumnData, setNameColumnData] = useState(indicadorData);
  const [colors, setColors] = useState(getChartColors);

  const getColor = (index, colors) => {
    if (index < colors.length) {
      return colors[index];
    } else {
      const baseColor = colors[index % colors.length];
      const darkenedColor = chroma(baseColor).darken();
      return darkenedColor.hex();
    }
  };

  return (
    <div>
      <p>Configuracion de series</p>
      <div className="w-11/12 bg-white rounded-lg  my-5 ">
        <div className="flex-1 ">
          {nameColumnData?.slice(1).map((item, index) => (
            <PresentationSeriesConfigurationList
              key={item[0]}
              nombre={item[0]}
              color={getColor(index, colors)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PresentationSeriesConfiguration;
