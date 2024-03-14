import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectEstadisticaDataFields,
  selectValidationErrors,
  setEstadisticaDatos,
  setFieldValidationErrors,
} from '../EstadisticaFormSlice';
import { DATOS_FIELDS_DEF } from './EstadisticaFieldsDef';
import { Input } from 'antd';
import { FieldValidation } from '../../../types/FieldValidation';
import FieldValidationsHelper from '../../../helpers/FieldValidationsHelper';
import IndicadorDataGrid from '../../../components/IndicadorDataGrid';

const fieldsArray = DATOS_FIELDS_DEF;

const IndicadorEditorTabDatos: React.FC = () => {
  const dispath = useAppDispatch();
  const values = useAppSelector(selectEstadisticaDataFields);
  const err = useAppSelector(selectValidationErrors);

  // console.log(err);

  const setValues = (values) => {
    dispath(setEstadisticaDatos(values));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const newValue = e.target.value;
    const validations: FieldValidation = {
      required: true,
      state: 'error',
    };
    const errors = FieldValidationsHelper.getFieldErrors(newValue, validations);

    console.log(errors);
    console.log(newValue);

    const updatedValues = {
      ...values,
      [key]: newValue,
    };

    setValues(updatedValues);
    dispath(setFieldValidationErrors({ fieldName: key, errors }));
  };
  return (
    <div className="overflow-auto" style={{ height: '380px' }}>
      <form>
        <table className="form-table ">
          <tbody>
            {Object.entries(fieldsArray).map(([fieldName, fieldDef]) => (
              <tr key={fieldName} className="flex flex-col pb-0">
                <th scope="row" className="th_data">
                  <label htmlFor={fieldName}>{fieldDef.label}</label>
                </th>
                <td className="td-data">
                  {fieldDef.type === 'table' ? (
                    <div
                      className={`container rounded-sm overflow-x-auto relative${
                        values?.tabla?.length ? 'p-0' : 'p-4'
                      }`}
                      style={{
                        scrollbarWidth: 'thin',
                        overflowX: 'auto',
                        border: values?.tabla?.length
                          ? 'none'
                          : '1px solid #94908c',
                      }}
                    >
                      {(values?.tabla?.length ?? 0) > 0 ? (
                        <IndicadorDataGrid data={values.tabla} />
                      ) : (
                        <div>Importe los datos</div>
                      )}
                    </div>
                  ) : (
                    <Input
                      name={fieldName}
                      type={fieldDef.type}
                      value={values[fieldName]}
                      onChange={(e) => handleChange(e, fieldName)}
                      required={fieldDef.required}
                      status={err[fieldName]}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default IndicadorEditorTabDatos;
