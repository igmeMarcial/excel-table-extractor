import { Field, Select, SelectOnChangeData } from '@fluentui/react-components';
import { ColorPicker } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectGraficoFieldValue,
  setGraficoSerieColor,
} from '../../pages/indicadores/EstadisticaFormSlice';
import { serieColor } from '../../utils/serieColor';

import ConfigSection from '../ConfigSection';
import SeriesEditor from './SeriesEditor';

interface DataConfigSectionProps {
  chartIndex: number;
}

const DataConfigSection = ({ chartIndex }: DataConfigSectionProps) => {
  const dispath = useAppDispatch();
  const [selectedSerieIndex, setSelectedSerieIndex] = useState(0);
  const series =
    useAppSelector(selectGraficoFieldValue(chartIndex, 'series')) || [];
  const selectedSerieColor =
    series[selectedSerieIndex]?.color || serieColor(selectedSerieIndex);

  const onSerieChange = (e, data: SelectOnChangeData) => {
    setSelectedSerieIndex(+data.value);
  };

  const onColorChange = (color) => {
    console.log('color', color);
    dispath(
      setGraficoSerieColor({
        chartIndex,
        serieIndex: selectedSerieIndex,
        color,
      })
    );
  };
  let serieIndex = -1;

  return (
    <ConfigSection title="Datos">
      <SeriesEditor chartIndex={chartIndex} />
      <Field label="Serie" orientation="horizontal">
        <Select onChange={onSerieChange} value={selectedSerieIndex.toString()}>
          {series.map((serie) => {
            serieIndex++;
            return (
              <option key={serieIndex} value={serieIndex}>
                {serie.nombre}
              </option>
            );
          })}
        </Select>
      </Field>
      <Field label="Serie" orientation="horizontal">
        <div>
          <ColorPicker
            value={selectedSerieColor}
            showText={true}
            onChange={(color: any) => onColorChange(color.toHexString())}
          />
        </div>
      </Field>
    </ConfigSection>
  );
};

export default DataConfigSection;
