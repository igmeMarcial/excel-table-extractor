import { useState } from 'react';
import { Field, Select, Spinner } from '@fluentui/react-components';
import { useGetMarcosOrdenadoresQuery } from '../../app/services/marco-ordenador';

interface MarcoOrdenadorSelectProps {
  onChange: (v: number) => void;
}

const MarcoOrdenadorSelect = ({ onChange }: MarcoOrdenadorSelectProps) => {
  const { data = [], isLoading } = useGetMarcosOrdenadoresQuery();
  const [value, setValue] = useState(-1);
  const handleChange = (e: any) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  return (
    <Field label="Marco Ordenador" className='w-[300px]' >
      <Select
        defaultValue="Mdea"
        value={value}
        onChange={handleChange}
        disabled={isLoading}
        icon={isLoading && <Spinner size="tiny" />}
        
      >
        <option disabled value={-1}>
          --Seleccionar--
        </option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.sigla}
          </option>
        ))}
      </Select>
    </Field>
  );
};

export default MarcoOrdenadorSelect;
