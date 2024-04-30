import { Select, Space } from 'antd';
import { useAppSelector } from '../app/hooks';
import {
  selectClasificadoresNivel1,
  selectIndiceEstadisticas,
} from '../app/AppSlice';
import { useEffect, useState } from 'react';

import { IndiceClasificadores } from '../../src/core/IndiceClasificadores';
import { Clasificador } from '../../src/types/Clasificador';
import { IndiceClasificadoresWeb } from '../app/core/IndiceClasificadorView';

const FICHA_SELECT = {
  clasificadorN1Id: {
    label: 'Componente',
    type: 'select',
    required: true,
  },
  clasificadorN2Id: {
    label: 'Sub componente',
    type: 'select',
    required: true,
  },
  clasificadorN3Id: {
    label: 'Tema estadístico',
    type: 'select',
    required: true,
  },
};

const WpSelectField = ({ onChange, options, fieldName }) => {
  return (
    <Select
      defaultValue={{ label: 'Select Dept', value: 0 }}
      style={{
        width: '100%',
      }}
      size="large"
      onChange={(e) => onChange(e, fieldName)}
      options={options.map((item) => ({
        value: item.numeral,
        label: item.nombre,
      }))}
    />
  );
};

const NavEstaditicas = () => {
  const clasificadores = useAppSelector(selectIndiceEstadisticas);
  const indiceClasificadores = new IndiceClasificadoresWeb(
    clasificadores || []
  );

  console.log(indiceClasificadores);

  const [valueSelect, setValueSelect] = useState({
    clasificadorN1Id: '',
    clasificadorN2Id: '',
    clasificadorN3Id: '',
  });

  const handleChange = (value, fieldName) => {
    console.log(`=====`);
    console.log(fieldName, value);
    setValueSelect({
      ...valueSelect,
      [fieldName]: value.toString(),
    });
  };

  const getSubComponentes = () => {
    return indiceClasificadores.getSubclasificadores(
      valueSelect.clasificadorN2Id
    );
  };
  console.log(getSubComponentes());
  const getTemasEstadisticos = () => {
    return indiceClasificadores.getSubclasificadores(
      valueSelect.clasificadorN3Id
    );
  };

  const getSelectFieldOptions = (fieldName: string) => {
    switch (fieldName) {
      case 'clasificadorN1Id':
        return indiceClasificadores.getItemsNivel1();
      case 'clasificadorN2Id':
        return getSubComponentes();
      case 'clasificadorN3Id':
        return getTemasEstadisticos();
      default:
        return [];
    }
  };

  return (
    <div className="py-3">
      <div className="h-8   bg-custom-blue w-full">
        <span className="text-white">1 condiones y calida ambiental</span>
      </div>
      <div className="w-full flex flex-col gap-4">
        {Object.entries(FICHA_SELECT).map(([fieldName, fieldDef]) => (
          <WpSelectField
            key={fieldName}
            options={getSelectFieldOptions(fieldName) || []}
            onChange={handleChange}
            fieldName={fieldName}
          />
        ))}
      </div>
    </div>
  );
};
export default NavEstaditicas;
