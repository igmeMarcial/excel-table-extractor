import {
  Field,
  Label,
  Input,
  TextareaOnChangeData,
} from '@fluentui/react-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectFormatoTablaFieldValue,
  setFormatoTablaFieldValue,
} from '../../pages/indicadores/EstadisticaFormSlice';

const DecimalsEditor = () => {
  const dispath = useAppDispatch();
  const fieldName = 'decimales';
  let value =
    useAppSelector(selectFormatoTablaFieldValue(fieldName)) || null;
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
        placeholder="Todas"
      />
    </div>
  );
};

export default DecimalsEditor;
