import React, { useState } from 'react';
import { ColorPicker } from 'antd';
import { Input } from '@fluentui/react-components';
import type { ColorPickerProps, GetProp } from 'antd';

type Color = GetProp<ColorPickerProps, 'value'>;
interface ConfigValues {
  chartColors: Color[];
  estadisticasUrl: string;
}
const colorsBase = {
  1: '#EB1E23',
  2: '#58595B',
  3: '#0071BC',
  4: '#05AFE0',
  5: '#23C1BB',
  6: '#5ABA5B',
  7: '#009245',
  8: '#DDA63A',
  9: '#A21942',
  10: '#FD6925',
};

interface ConfiguracionMainProps {
  onSettingChange: (values: any) => void;
}

const ConfiguracionMain: React.FC<ConfiguracionMainProps> = ({
  onSettingChange,
}) => {
  const [selectedColors, setSelectedColors] = useState(colorsBase);
  const [valueInput, setValueInput] = useState(
    'https://appsinia.analyticsperu.com/portalregional/datos.do'
  );
  const onChange = (e) => {
    const newValue = e.target.value;
    setValueInput(newValue);
    onSettingChange({
      chartColors: selectedColors,
      estadisticasUrl: newValue,
    });
  };
  const handleColorChange = (colorValue: any, index: number) => {
    const newColor = colorValue.toHexString();
    const updatedValues = { ...selectedColors, [index]: newColor };
    updatedValues[index] = newColor;
    onSettingChange({
      chartColors: updatedValues,
      estadisticasUrl: valueInput,
    });
    setSelectedColors(updatedValues);
  };
  console.log(selectedColors);
  return (
    <div className="px-12  ">
      <div>
        <h2 className="text-lg font-normal">Graficos</h2>
        <div className="flex flex-row items-center gap-12">
          <h4>colores de series</h4>
          <div>
            {Object.keys(selectedColors).map((colorKey, index) => (
              <ColorPicker
                key={`${colorKey}_`}
                value={selectedColors[colorKey]}
                onChange={(color) => handleColorChange(color, index + 1)}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-normal">Origen de datos</h2>
        <div className="flex flex-row items-center gap-12">
          <h4>Estadísticas</h4>
          <Input
            type="url"
            value={valueInput}
            onChange={onChange}
            className=" leading-8 min-h-30 box-border shadow-none rounded-md border border-gray-400 bg-white text-gray-800 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionMain;
