import { Input, Select, Textarea, Switch } from '@fluentui/react-components';
import { FieldType } from '../../types/FieldType';

interface WpDynamicInputProps {
  fieldName: string;
  onChange: (value: any, fieldName: string, e: any) => void;
  onTouched: (e: any, fieldName: string) => void;
  value: string | boolean;
  controlType: FieldType;
  options?: any[];
  textField?: string;
  valueField?: string;
  textRenderer?: (value: any) => string;
}

const WpDynamicInput = ({
  fieldName,
  onChange,
  onTouched,
  value,
  controlType: type,
  options,
  textField,
  valueField,
  textRenderer,
}: WpDynamicInputProps) => {
  value = value || '';
  // TEXT
  if (type === 'text' || type === 'number') {
    return (
      <Input
        type={type}
        name={fieldName}
        value={value as string}
        onChange={(e, data) => onChange(data.value, fieldName, e)}
        onBlur={(e) => onTouched(e, fieldName)}
      />
    );
  }
  // TEXTAREA
  if (type === 'textarea') {
    return (
      <Textarea
        name={fieldName}
        value={value as string}
        onChange={(e, data) => onChange(data.value, fieldName, e)}
        onBlur={(e) => onTouched(e, fieldName)}
        resize="vertical"
      />
    );
  }
  // SELECT
  if (type === 'select') {
    textRenderer = textRenderer || ((option) => option[textField]);
    return (
      <Select
        onChange={(e, data) => onChange(data.value, fieldName, e)}
        value={value as string}
        name={fieldName}
        id={fieldName}
        onBlur={(e) => onTouched(e, fieldName)}
      >
        <option value="">-- Seleccionar --</option>
        {options.map((option) => (
          <option key={option.id} value={option[valueField]}>
            {textRenderer(option)}
          </option>
        ))}
      </Select>
    );
  }
  // SWITCH
  if (type === 'switch') {
    return (
      <Switch
        checked={value as boolean}
        name={fieldName}
        onChange={(e, data) => onChange(data.checked, fieldName, e)}
      />
    );
  }
  // DEFAULT
  return (
    <Input
      name={fieldName}
      value={value as string}
      onChange={(e, data) => onChange(data.value, fieldName, e)}
      onBlur={(e) => onTouched(e, fieldName)}
    />
  );
};

export default WpDynamicInput;
