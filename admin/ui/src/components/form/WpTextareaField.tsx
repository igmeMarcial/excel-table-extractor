import { Field, Textarea } from '@fluentui/react-components';
import { VALIDATION_MESSAGES } from '../../config/validation-messages';
import { FieldDef } from '../../pages/indicadores/editor/EstadisticaFieldsDef';

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
  validationErrors = validationErrors || {};
  let validationMessage = '';
  if (validationErrors.required) {
    validationMessage = VALIDATION_MESSAGES.required;
  }
  return (
    <tr key={fieldName}>
      <th scope="row">
        <label htmlFor={fieldName}>
          {fieldDef.label}{' '}
          {fieldDef.required ? <span className="text-red-600">*</span> : null}
        </label>
      </th>
      <td>
        <Field
          required={fieldDef.required}
          validationMessage={validationMessage}
        >
          <Textarea
            name={fieldName}
            value={value}
            onChange={(e) => onChange(e, fieldName)}
            onBlur={(e) => onTouched(e, fieldName)}
          />
        </Field>
      </td>
    </tr>
  );
};

export default WpTextareaField;
