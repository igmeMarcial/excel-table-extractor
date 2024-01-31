import React from 'react';
import { Button } from 'antd';

import {
  ArrowImport24Regular,
  ArrowCurveDownLeft24Regular,
} from '@fluentui/react-icons';

function IndicadorEditorhHeader({ nameIndicador }) {
  return (
    <>
      <div className="bg-custom-grey flex px-12 pt-3 pb-3 gap-2 items-center">
        <p className="text-2xl md:text-2xl font-bold p-0 m-1">Indicador</p>
        <span className="flex-1"></span>
        <Button
          type="text"
          icon={<ArrowImport24Regular className="w-5 align-middle" />}
        >
          Actualizar desde ficha técnica
        </Button>
        <Button
          type="text"
          style={{ color: '#2271B1' }}
          icon={
            <ArrowCurveDownLeft24Regular
              className="w-5 align-middle"
              style={{ color: '#DA3B01' }}
            />
          }
        >
          Descartar cambios
        </Button>
      </div>
      <p className="block bg-custom-grey m-0">{nameIndicador}</p>
    </>
  );
}

export default IndicadorEditorhHeader;
