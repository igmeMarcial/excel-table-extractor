import { Textarea } from '@fluentui/react-components';
import { FieldDef } from '../../pages/estadisticas/editor/EstadisticaFieldsDef';
import WpField from './WpField';

interface WpTextareaFieldProps {
  fieldDef: FieldDef;
  fieldName: string;
  onChange: (e: any, fieldName: string) => void;
  onTouched: (e: any, fieldName: string) => void;
  value: string;
  validationErrors: any;
}

const WpTextareaField = ({
  fieldDef,
  fieldName,
  onChange,
  onTouched,
  value,
  validationErrors,
}: WpTextareaFieldProps) => {
  value = value || '';
  return (
    <WpField
      fieldDef={fieldDef}
      fieldName={fieldName}
      validationErrors={validationErrors}
    >
      <Textarea
        name={fieldName}
        value={value}
        onChange={(e) => onChange(e, fieldName)}
        onBlur={(e) => onTouched(e, fieldName)}
        resize="vertical"
      />
    </WpField>
  );
};

export default WpTextareaField;
