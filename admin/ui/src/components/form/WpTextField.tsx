import { Input } from '@fluentui/react-components';
import { FieldDef } from '../../pages/estadisticas/editor/EstadisticaFieldsDef';
import WpField from './WpField';

interface WpTextFieldProps {
  fieldDef: FieldDef;
  fieldName: string;
  onChange: (e: any, fieldName: string) => void;
  onTouched: (e: any, fieldName: string) => void;
  value: string;
  validationErrors: any;
  placeholder?: string;
}

const WpTextField = ({
  fieldDef,
  fieldName,
  onChange,
  onTouched,
  value,
  validationErrors,
  placeholder,
}: WpTextFieldProps) => {
  value = value || '';
  return (
    <WpField
      fieldDef={fieldDef}
      fieldName={fieldName}
      validationErrors={validationErrors}
    >
      <Input
        name={fieldName}
        value={value}
        onChange={(e) => onChange(e, fieldName)}
        onBlur={(e) => onTouched(e, fieldName)}
        placeholder={placeholder || fieldDef.placeholder}
      />
    </WpField>
  );
};

export default WpTextField;
