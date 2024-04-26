import { FieldDef } from '../../pages/indicadores/editor/EstadisticaFieldsDef';
import WpDynamicInput from './WpDynamicInput';
import WpField from './WpField';

interface WpDynamicFieldProps {
  fieldDef: FieldDef;
  fieldName: string;
  onChange: (e: any, fieldName: string) => void;
  onTouched: (e: any, fieldName: string) => void;
  value: string;
  validationErrors: any;
  options?: any[];
  textField?: string;
  valueField?: string;
  textRenderer?: (value: any) => string;
}

const WpDynamicField = ({
  fieldDef,
  fieldName,
  onChange,
  onTouched,
  value,
  validationErrors,
  options,
  textField,
  valueField,
  textRenderer,
}: WpDynamicFieldProps) => {
  value = value || '';
  return (
    <WpField
      fieldDef={fieldDef}
      fieldName={fieldName}
      validationErrors={validationErrors}
    >
      <WpDynamicInput
        fieldName={fieldName}
        value={value}
        type={fieldDef.type}
        options={options}
        textField={textField}
        valueField={valueField}
        textRenderer={textRenderer}
        onChange={(e) => onChange(e, fieldName)}
        onTouched={(e) => onTouched(e, fieldName)}
      />
    </WpField>
  );
};

export default WpDynamicField;
