import React, { useState } from 'react';
import { ColorPicker } from 'antd';

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
  const [colorValue, setColorValue] = useState(null);
  const [valueInput, setValueInput] = useState(
    'EnteredText="https://appsinia.analyticsperu.com/portalregional/datos.do'
  );
  console.log(colorValue);
  return (
    <div className="px-12  ">
      <div>
        <h2 className="text-lg font-normal">Graficos</h2>
        <div className="flex flex-row items-center gap-12">
          <h4>colores de series</h4>
          <div>
            {colorsBase.map((color) => (
              <ColorPicker value={color} onChange={setColorValue} />
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
            class=" leading-8 min-h-30 box-border shadow-none rounded-md border border-gray-400 bg-white text-gray-800 w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default ConfiguracionMain;
