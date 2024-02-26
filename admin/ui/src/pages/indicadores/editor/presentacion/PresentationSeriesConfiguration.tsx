import React, { useState } from 'react';
import PresentationSeriesConfigurationList from './PresentationSeriesConfigurationList';
import { getChartColors } from '../../../../utils/colors';
import chroma from 'chroma-js';
import { useAppSelector } from '../../../../app/hooks';
import { selectEstadisticaData, selectEstadisticaDataFields } from '../../EstadisticaFormSlice';

const PresentationSeriesConfiguration: React.FC = () => {
  const [colors, setColors] = useState(getChartColors);
  // const data = useAppSelector(selectEstadisticaData);
  const data = useAppSelector(selectEstadisticaDataFields).datos;//Test

  let number = 1;
  const getColor = (index: number, colors: string[]) => {
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
  console.log(data)

  return (
    <div>
      <p>Configuracion de series</p>
      <div className="w-11/12 bg-white rounded-lg  my-5 ">
        <div className="flex-1 ">
          {Array.isArray(data) && data.length > 0 ? (
            data
              .slice(1)
              .map((item, index) => (
                <PresentationSeriesConfigurationList
                  key={item[0]}
                  nombre={String(item[0])}
                  color={getColor(index, colors)}
                  number={getNumber()}
                />
              ))
          ) : (
            <div>Importe los datos</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PresentationSeriesConfiguration;
