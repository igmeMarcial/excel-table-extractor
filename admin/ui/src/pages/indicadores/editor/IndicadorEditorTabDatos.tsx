import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectEstadisticaData,
  selectEstadisticaDataFields,
  selectValidationErrors,
  setEstadisticaDatosFieldValue,
} from '../EstadisticaFormSlice';
import { DATOS_FIELDS_DEF } from './EstadisticaFieldsDef';
import DataTable from '../../../components/DataTable';
import { Field, Input } from '@fluentui/react-components';

const fieldsArray = DATOS_FIELDS_DEF;

const TextField = ({ fieldName }) => {
  const fieldDef = fieldsArray[fieldName];
  const dispath = useAppDispatch();
  const values = useAppSelector(selectEstadisticaDataFields);
  let fieldValue = values[fieldName] || ''; // Valor predeterminado en caso de que sea undefined
  const err = useAppSelector(selectValidationErrors);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispath(
      setEstadisticaDatosFieldValue({ field: fieldName, value: e.target.value })
    );
  };
  return (
    <Field label={fieldDef.label}>
      <Input
        name={fieldName}
        type="text"
        value={fieldValue}
        onChange={handleChange}
        required={fieldDef.required}
      />
    </Field>
  );
};

const IndicadorEditorTabDatos = () => {
  const data = useAppSelector(selectEstadisticaData);
  return (
    <form>
      <div className="flex flex-col gap-y-4">
        <TextField fieldName="nombre" />
        <Field label="Tabla de datos">
          <div className="p-3 border border-solid  border-gray-300 rounded overflow-hidden">
            <DataTable data={data} />
          </div>
        </Field>
        <TextField fieldName="nota" />
        <TextField fieldName="fuente" />
        <TextField fieldName="elaboracion" />
      </div>
    </form>
  );
};

export default IndicadorEditorTabDatos;
