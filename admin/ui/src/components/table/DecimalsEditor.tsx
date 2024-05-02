import {
  Field,
  Label,
  Input,
  TextareaOnChangeData,
} from '@fluentui/react-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DT_TABLA_DATOS_DECIMALES_DEFECTO } from '../../config/design-tokens';
import {
  selectFormatoTablaFieldValue,
  setFormatoTablaFieldValue,
} from '../../pages/estadisticas/EstadisticaFormSlice';

const DecimalsEditor = () => {
  const dispath = useAppDispatch();
  const fieldName = 'decimales';
  let value = useAppSelector(selectFormatoTablaFieldValue(fieldName)) || null;
  const handleChange = (e, data: TextareaOnChangeData) => {
    dispath(
      setFormatoTablaFieldValue({
        field: fieldName,
        value: data.value,
      })
    );
  };
  return (
    <div className="flex items-center gap-2">
      <Label>Decimales</Label>
      <Input
        type="number"
        onChange={handleChange}
        value={String(value)}
        min="0"
        max="4"
        placeholder={DT_TABLA_DATOS_DECIMALES_DEFECTO + ''}
      />
    </div>
  );
};

export default DecimalsEditor;
