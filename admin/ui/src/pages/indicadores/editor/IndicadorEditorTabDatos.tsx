import React, { useEffect, useRef, useState } from 'react';
import IndicadorDataGrid from './IndicadorDataGrid';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectEstadisticaDataFields,
  setEstadisticaDataFields,
} from '../EstadisticaFormSlice';
import { DATOS_FIELDS_DEF } from './EstadisticaFieldsDef';
import { Input } from 'antd';

const fieldsArray = DATOS_FIELDS_DEF;

const IndicadorEditorTabDatos: React.FC = () => {
  const dispath = useAppDispatch();
  const values = useAppSelector(selectEstadisticaDataFields);
   
  const [containerHeight, setContainerHeight] = useState<number | null>(300);
const divRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
         if (divRef.current) {
        const newHeight = divRef.current.scrollHeight;
        if (newHeight !== containerHeight) {
            setContainerHeight(newHeight);
        }
        console.log("cambios detectafo")
    }
    }, [values]);

  const setValues = (values) => {
    dispath(setEstadisticaDataFields(values));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const newValue = e.target.value;
    const updatedValues = {
      ...values,
      [key]: newValue,
    };
    setValues(updatedValues);
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
                       style={{ scrollbarWidth: 'thin', border: values?.data?.length ? 'none' : '1px solid #8C8F94',height: values?.data?.length ? `${containerHeight}px` : 'auto', }}
                      className={`rounded-sm relative overflow-x-auto ${values?.data?.length ? 'p-0' : 'p-4'}`}
                      ref={divRef}
                    >
                      {(values?.data?.length ?? 0) > 0 ? (
                        <IndicadorDataGrid data={values.data} />
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
