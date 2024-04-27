import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectEstadisticaDatos,
  selectEstadisticaValues,
  selectValidationErrors,
  setEstadisticaFieldValue,
  validateEstadisticaField,
} from '../EstadisticaFormSlice';
import { DATOS_FIELDS_DEF } from './EstadisticaFieldsDef';
import Datasheet from '../../../components/Datasheet';
import WpField from '../../../components/form/WpField';
import WpDynamicField from '../../../components/form/WpDynamicField';
import WpTextField from '../../../components/form/WpTextField';

const Field = ({ fieldName }) => {
  const fieldDef = DATOS_FIELDS_DEF[fieldName];
  const dispath = useAppDispatch();
  const validationErrors = useAppSelector(selectValidationErrors);
  const values = useAppSelector(selectEstadisticaValues) || {};
  const handleChange = (e) => {
    const { name: fiendName, value } = e.target;
    dispath(setEstadisticaFieldValue({ field: fiendName, value }));
  };

  const handleTouched = (e) => {
    const { name: fieldName, value } = e.target;
    dispath(validateEstadisticaField({ field: fieldName, value }));
  };
  return (
    <WpDynamicField
      fieldDef={fieldDef}
      fieldName={fieldName}
      validationErrors={validationErrors[fieldName]}
      value={values[fieldName]}
      onChange={handleChange}
      onTouched={handleTouched}
    ></WpDynamicField>
  );
};
const TituloField = () => {
  const fieldName = 'presentacionTablaTitulo';
  const fieldDef = DATOS_FIELDS_DEF[fieldName];
  const dispath = useAppDispatch();
  const validationErrors = useAppSelector(selectValidationErrors);
  const values = useAppSelector(selectEstadisticaValues) || {};
  const placeholder = `${values.nombre}, ${values.periodoSerieTiempo}`;
  const handleChange = (e) => {
    const { name: fiendName, value } = e.target;
    dispath(setEstadisticaFieldValue({ field: fiendName, value }));
  };

  const handleTouched = (e) => {
    const { name: fieldName, value } = e.target;
    dispath(validateEstadisticaField({ field: fieldName, value }));
  };
  return (
    <WpTextField
      fieldDef={fieldDef}
      fieldName={fieldName}
      validationErrors={validationErrors[fieldName]}
      value={values[fieldName]}
      onChange={handleChange}
      onTouched={handleTouched}
      placeholder={placeholder}
    ></WpTextField>
  );
};
const EstadisticaEditorTabDatos = () => {
  const data = useAppSelector(selectEstadisticaDatos);
  const validationErrors = useAppSelector(selectValidationErrors);
  return (
    <form>
      <table className="form-table">
        <tbody>
          <TituloField />
          <WpField
            fieldDef={DATOS_FIELDS_DEF.datos}
            fieldName="datos"
            validationErrors={validationErrors.datos}
          >
            <div
              className="p-3 border border-solid rounded overflow-hidden"
              style={{ borderColor: '#b3b3b3' }}
            >
              <Datasheet data={data} />
            </div>
          </WpField>
          <Field fieldName="presentacionTablaNota" />
          <Field fieldName="presentacionTablaFuente" />
          <Field fieldName="presentacionTablaElaboracion" />
        </tbody>
      </table>
    </form>
  );
};

export default EstadisticaEditorTabDatos;
