import React, { useState } from 'react';
import { ColorPicker } from 'antd';
import { Input } from '@fluentui/react-components';
import type { ColorPickerProps, GetProp } from 'antd';

type Color = GetProp<ColorPickerProps, 'value'>;
interface ConfigValues {
  chartColors: Color[];
  estadisticasUrl: string;
}
const colorsBase = [
  '#EB1E23',
  '#58595B',
  '#0071BC',
  '#05AFE0',
  '#23C1BB',
  '#5ABA5B',
  '#009245',
  '#DDA63A',
  '#A21942',
  '#FD6925',
];


interface ConfiguracionMainProps {
  onSettingChange: (values:any)=>void;
}

const ConfiguracionMain: React.FC<ConfiguracionMainProps> = ({onSettingChange})=> {
  const [selectedColors, setSelectedColors] = useState(colorsBase);
  const [valueInput, setValueInput] = useState(
    'https://appsinia.analyticsperu.com/portalregional/datos.do'
  );
  const onChange = (e) => {
    const newValue = e.target.value;
    setValueInput(newValue)
    onSettingChange({
      colors: getColorsObject(selectedColors),
      url: newValue,
    });
  };
  const handleColorChange = (colorValue:any, index:number) => {
    const newColor = colorValue.toHexString(); 
   let updatedValues = [...selectedColors];
   updatedValues[index] = newColor;
    onSettingChange({
      colors: getColorsObject(updatedValues),
      url: valueInput,
    });
   setSelectedColors(updatedValues);
  };
    const getColorsObject = (colors) => {
    return colors.reduce((obj, color, idx) => {
      obj[idx] = color;
      return obj;
    }, {});
  };

  // console.log(selectedColors)
  return (
    <div className="px-12  ">
      <div>
        <h2 className="text-lg font-normal">Graficos</h2>
        <div className="flex flex-row items-center gap-12">
          <h4>colores de series</h4>
          <div>
            {selectedColors.map((colorValue, index) => (
              <ColorPicker
                key={`${colorValue}_`}
                value={colorValue}
                onChange={(color) => handleColorChange(color, index)}
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
}

export default ConfiguracionMain;
