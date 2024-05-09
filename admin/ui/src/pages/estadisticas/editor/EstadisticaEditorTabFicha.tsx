import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  setEstadisticaFieldValue,
  selectValidationErrors,
  validateEstadisticaField,
  selectEstadisticaValues,
} from '../EstadisticaFormSlice';
import { ESTADISTICA_FICHA_FIELDS_DEF } from './EstadisticaFieldsDef';
import { useGetIndiceClasificadoresQuery } from '../../../app/services/clasificador';
import { IndiceClasificadores } from '../../../core/IndiceClasificadores';
import WpSelectField from '../../../components/form/WpSelectField';
import WpDynamicField from '../../../components/form/WpDynamicField';

const EstadisticaEditorTabFicha = () => {
  const dispath = useAppDispatch();
  const values = useAppSelector(selectEstadisticaValues);
  const validationErrors = useAppSelector(selectValidationErrors);
  const { data: clasificadores } = useGetIndiceClasificadoresQuery();
  const indiceClasificadores = new IndiceClasificadores(clasificadores || []);
  const handleChange = (value, fieldName) => {
    dispath(setEstadisticaFieldValue({ field: fieldName, value }));
  };

  const handleSelectChange = (e) => {
    const { name: fiendName, value } = e.target;
    dispath(setEstadisticaFieldValue({ field: fiendName, value: +value }));
  };
  const handleTouched = (e) => {
    const { name: fieldName, value } = e.target;
    dispath(validateEstadisticaField({ field: fieldName, value }));
  };
  const getSubComponentes = () => {
    return indiceClasificadores.getSubclasificadores(values.clasificadorN1Id);
  };
  const getTemasEstadisticos = () => {
    return indiceClasificadores.getSubclasificadores(values.clasificadorN2Id);
  };
  const getSelectFieldOptions = (fieldName: string) => {
    switch (fieldName) {
      case 'clasificadorN1Id':
        return indiceClasificadores.getItemsNivel1();
      case 'clasificadorN2Id':
        return getSubComponentes();
      case 'clasificadorN3Id':
        return getTemasEstadisticos();
      default:
        return [];
    }
  };
  return (
    <div>
      <div className="h-full overflow-auto scroll-container pr-8">
        <form className="h-full flex flex-col justify-between">
          <table className="form-table">
            <tbody>
              {Object.entries(ESTADISTICA_FICHA_FIELDS_DEF).map(
                ([fieldName, fieldDef]) => {
                  if (fieldDef.controlType === 'select') {
                    return (
                      <WpSelectField
                        key={fieldName}
                        fieldDef={fieldDef}
                        fieldName={fieldName}
                        options={getSelectFieldOptions(fieldName) || []}
                        onChange={handleSelectChange}
                        onTouched={handleTouched}
                        valueField="id"
                        textRenderer={(option) =>
                          `${option.numeral} ${option.nombre}`
                        }
                        value={values[fieldName]}
                        validationErrors={validationErrors[fieldName]}
                      />
                    );
                  }
                  return (
                    <WpDynamicField
                      fieldDef={fieldDef}
                      fieldName={fieldName}
                      validationErrors={validationErrors[fieldName]}
                      value={values[fieldName]}
                      onChange={handleChange}
                      onTouched={handleTouched}
                      key={fieldName}
                    />
                  );
                }
              )}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default EstadisticaEditorTabFicha;
