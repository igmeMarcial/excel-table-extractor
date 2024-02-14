import React, { useState } from 'react';
import { ColorPicker } from 'antd';
import type { ColorPickerProps, GetProp } from 'antd';


type Color = GetProp<ColorPickerProps, 'value'>;

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


function ConfiguracionMain() {

   const [selectedColors, setSelectedColors] = useState(colorsBase);
  const [valueInput, setValueInput] = useState(
    'EnteredText="https://appsinia.analyticsperu.com/portalregional/datos.do'
  );
  const onChange = (e) => {
    
  };
   const handleColorChange = (colorValue, index) => {
    setSelectedColors(prevColors => {
      const newColors = [...prevColors];
      newColors[index] = colorValue;
      return newColors;
    });
  };

  return (
    <div className="px-12  ">
      <div>
        <h2 className="text-lg font-normal">Graficos</h2>
        <div className="flex flex-row items-center gap-12">
          <h4>colores de series</h4>
          <div>
            {selectedColors.map((colorValue,index) => (
              <ColorPicker key={`${colorValue}_${index}`} value={colorValue} onChange={(color) => handleColorChange(color, index)} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-normal">Origen de datos</h2>
        <div className="flex flex-row items-center gap-12">
          <h4>Estadísticas</h4>
          <input
            name="blogname"
            type="text"
            id="blogname"
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
