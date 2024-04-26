import { Input, Select, Textarea } from '@fluentui/react-components';
import { FieldType } from '../../types/FieldType';

interface WpDynamicInputProps {
  fieldName: string;
  onChange: (e: any, fieldName: string) => void;
  onTouched: (e: any, fieldName: string) => void;
  value: string;
  type: FieldType;
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
  type,
  options,
  textField,
  valueField,
  textRenderer,
}: WpDynamicInputProps) => {
  value = value || '';
  // TEXT
  if (type === 'text') {
    return (
      <Input
        name={fieldName}
        value={value}
        onChange={(e) => onChange(e, fieldName)}
        onBlur={(e) => onTouched(e, fieldName)}
      />
    );
  }
  // TEXTAREA
  if (type === 'textarea') {
    return (
      <Textarea
        name={fieldName}
        value={value}
        onChange={(e) => onChange(e, fieldName)}
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
        onChange={(e) => onChange(e, fieldName)}
        value={value}
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
  // DEFAULT
  return (
    <Input
      name={fieldName}
      value={value}
      onChange={(e) => onChange(e, fieldName)}
      onBlur={(e) => onTouched(e, fieldName)}
    />
  );
};

export default WpDynamicInput;
