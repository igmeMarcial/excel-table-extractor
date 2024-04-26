import { Field } from '@fluentui/react-components';
import { VALIDATION_MESSAGES } from '../../config/validation-messages';
import { FieldDef } from '../../pages/indicadores/editor/EstadisticaFieldsDef';

interface WpFieldProps {
  fieldDef: FieldDef;
  fieldName: string;
  validationErrors: any;
  children: React.ReactNode;
}

const WpField = ({
  fieldDef,
  fieldName,
  validationErrors,
  children,
}: WpFieldProps) => {
  validationErrors = validationErrors || {};
  let validationMessage = '';
  if (validationErrors.required) {
    validationMessage = VALIDATION_MESSAGES.required;
  }
  return (
    <tr key={fieldName}>
      <th className="label">
        <label htmlFor={fieldName}>
          {fieldDef.label}{' '}
          {fieldDef.required ? <span className="text-red-600">*</span> : null}
        </label>
      </th>
      <td className="field">
        <Field
          required={fieldDef.required}
          validationMessage={validationMessage}
        >
          {children}
        </Field>
      </td>
    </tr>
  );
};

export default WpField;
