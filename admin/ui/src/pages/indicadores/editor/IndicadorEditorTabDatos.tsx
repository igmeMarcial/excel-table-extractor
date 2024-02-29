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
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  // Actualizando el tamaño de div de la tabla
  useEffect(() => {
    // Función para obtener la altura de la div
    const updateContainerHeight = () => {
      if (divRef.current) {
        // setContainerHeight(null);
        const newHeight = divRef.current.scrollHeight;
        if (newHeight !== containerHeight) {
          setContainerHeight(newHeight);
          // console.log(newHeight)
        }
      }
    };

    updateContainerHeight(); // Llama a la función una vez al principio
    // console.log(updateContainerHeight())
    // Escucha los cambios en el valor 'values' y actualiza la altura de la div
    const handleResize = () => {
      updateContainerHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [divRef.current, values]);

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
  //  console.log(containerHeight)
  console.log(values)
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
                      style={{
                        scrollbarWidth: 'thin',
                        border: values?.tabla?.length
                          ? 'none'
                          : '1px solid #8C8F94',
                        height: values?.tabla?.length
                          ? `${containerHeight}px`
                          : 'auto',
                      }}
                      className={`rounded-sm relative overflow-x-auto ${
                        values?.tabla?.length ? 'p-0' : 'p-4'
                      }`}
                      ref={divRef}
                    >
                      {(values?.tabla?.length ?? 0) > 0 ? (
                        <IndicadorDataGrid data={values.tabla} />
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
