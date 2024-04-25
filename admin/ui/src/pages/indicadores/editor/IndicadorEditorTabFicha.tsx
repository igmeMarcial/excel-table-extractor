import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  setEstadisticaFieldValue,
  selectFichaTecnica,
  selectValidationErrors,
  validateEstadisticaField,
} from '../EstadisticaFormSlice';
import { ESTADISTICA_FIELDS_DEF } from './EstadisticaFieldsDef';
import { useGetIndiceClasificadoresQuery } from '../../../app/services/clasificador';
import { IndiceClasificadores } from '../../../core/IndiceClasificadores';
import WpTextField from '../../../components/form/WpTextField';
import WpTextareaField from '../../../components/form/WpTextareaField';
import WpSelectField from '../../../components/form/WpSelectField';

const IndicadorEditorTabFicha = () => {
  const dispath = useAppDispatch();
  const values = useAppSelector(selectFichaTecnica);
  const validationErrors = useAppSelector(selectValidationErrors);
  const { data: clasificadores } = useGetIndiceClasificadoresQuery();
  const indiceClasificadores = new IndiceClasificadores(clasificadores || []);
  const handleChange = (e) => {
    const { name: fiendName, value } = e.target;
    dispath(setEstadisticaFieldValue({ field: fiendName, value }));
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
              {Object.entries(ESTADISTICA_FIELDS_DEF).map(
                ([fieldName, fieldDef]) => {
                  if (fieldDef.type === 'select') {
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
                  } else if (fieldDef.type === 'textarea') {
                    return (
                      <WpTextareaField
                        fieldDef={fieldDef}
                        key={fieldName}
                        fieldName={fieldName}
                        onChange={handleChange}
                        onTouched={handleTouched}
                        value={values[fieldName]}
                        validationErrors={validationErrors[fieldName]}
                      />
                    );
                  } else {
                    return (
                      <WpTextField
                        key={fieldName}
                        fieldDef={fieldDef}
                        fieldName={fieldName}
                        onChange={handleChange}
                        onTouched={handleTouched}
                        value={values[fieldName]}
                        validationErrors={validationErrors[fieldName]}
                      />
                    );
                  }
                }
              )}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default IndicadorEditorTabFicha;
