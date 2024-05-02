import { Select } from '@fluentui/react-components';
import { FieldDef } from '../../pages/estadisticas/editor/EstadisticaFieldsDef';
import WpField from './WpField';

interface WpSelectFieldProps {
  fieldDef: FieldDef;
  fieldName: string;
  onChange: (e: any, fieldName: string) => void;
  onTouched: (e: any, fieldName: string) => void;
  textRenderer?: (value: any) => string;
  textField?: string;
  valueField?: string;
  value: string;
  options: any[];
  validationErrors: any;
}

const WpSelectField = ({
  fieldDef,
  fieldName,
  onChange,
  onTouched,
  options,
  value,
  validationErrors,
  textRenderer: textRender,
  textField,
  valueField,
}: WpSelectFieldProps) => {
  // Default values
  textField = textField || 'text';
  valueField = valueField || 'value';
  value = value || '';
  validationErrors = validationErrors || {};
  textRender = textRender || ((option) => option[textField]);
  return (
    <WpField
      fieldDef={fieldDef}
      fieldName={fieldName}
      validationErrors={validationErrors}
    >
      <Select
        onChange={(e) => onChange(e, fieldName)}
        value={value}
        name={fieldName}
        id={fieldName}
        onBlur={(e) => onTouched(e, fieldName)}
      >
        <option value="" disabled>
          -- Seleccionar --
        </option>
        {options.map((option) => (
          <option key={option.id} value={option[valueField]}>
            {textRender(option)}
          </option>
        ))}
      </Select>
    </WpField>
  );
};

export default WpSelectField;
