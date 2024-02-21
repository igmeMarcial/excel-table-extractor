import React, { useEffect} from 'react';
import IndicadorDataGrid from './IndicadorDataGrid';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectEstadisticaDataFields, selectExcelTable, setEstadisticaDataFields } from '../EstadisticaFormSlice';
import { DATOS_FIELDS_DEF } from './EstadisticaFieldsDef';
import { Input } from 'antd';

const fieldsArray = DATOS_FIELDS_DEF;

const IndicadorEditorTabDatos: React.FC = () => {

  const dispath = useAppDispatch();
  const values= useAppSelector(selectEstadisticaDataFields);
  const tableData = useAppSelector(selectExcelTable)

  const setValues = (values) => {
    dispath(setEstadisticaDataFields(values));
  };

  useEffect(()=>{
    const valuesDataTable = tableData?.sheetData;
    if (valuesDataTable) {
      const valuesData = tableData.sheetData;
    setValues({...values,...valuesData}); 
    }

  },[tableData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
  const newValue = e.target.value;
   const updatedValues = {
    ...values,
    [key]: newValue
  };
  setValues(updatedValues)
  };

  return (
    <div className="overflow-y-auto scroll-container " style={{ height: '380px' }}>
      <form>
        <table className="form-table">
          <tbody>
            {Object.entries(fieldsArray).map(([fieldName, fieldDef]) => (
              <tr key={fieldName} className="flex flex-col pb-0">
                <th scope="row" className="th_data">
                  <label htmlFor={fieldName}>{fieldDef.label}</label>
                </th>
                <td className="td-data">
                  {fieldDef.type === 'table' ? (
                    <div
                      style={{ border: '1px solid #8C8F94' }}
                      className="p-4 rounded-sm overflow-x-auto"
                    >
                      { (tableData?.tableData?.length ?? 0) > 0 ? (
                        <IndicadorDataGrid data={tableData.tableData} />
                      ) : (
                        <div>No hay datos</div>
                      )}
                    </div>
                  ) : (
                    <Input
                      name={fieldName}
                      type={fieldDef.type}
                       value={values[fieldName]}
                      onChange={(e) => handleChange(e, fieldName)}
                      required={fieldDef.required}
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
