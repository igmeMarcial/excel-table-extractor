import { FieldDef } from '../../pages/estadisticas/editor/EstadisticaFieldsDef';
import WpDynamicInput from './WpDynamicInput';
import WpField from './WpField';

interface WpDynamicFieldProps {
  fieldDef: FieldDef;
  fieldName: string;
  onChange: (value: any, fieldName: string, e: any) => void;
  onTouched: (e: any, fieldName: string) => void;
  value: string | boolean;
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
        controlType={fieldDef.controlType}
        options={options}
        textField={textField}
        valueField={valueField}
        textRenderer={textRenderer}
        onChange={onChange}
        onTouched={(e) => onTouched(e, fieldName)}
      />
    </WpField>
  );
};

export default WpDynamicField;
