import React from 'react';
import { Select } from '@fluentui/react-components';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  setEstadisticaFieldValue,
  selectEstadisticaFields,
  selectValidationErrors,
} from '../EstadisticaFormSlice';
import { Input } from 'antd';
import { ESTADISTICA_FIELDS_DEF } from './EstadisticaFieldsDef';
import { useGetIndiceClasificadoresQuery } from '../../../app/services/clasificador';
import { IndiceClasificadores } from '../../../core/IndiceClasificadores';

interface Urls {
  componenteUrl: string;
  subComponentesUrl: string;
  temasEstadisticosUrl: string;
}

const apiUrl: any = window.AesaInfo.apiUrl;

const urls: Urls = {
  componenteUrl: `${apiUrl}/mdea/componentes`,
  subComponentesUrl: `${apiUrl}/mdea/subcomponentes`,
  temasEstadisticosUrl: `${apiUrl}/mdea/temas-estadisticos`,
};

const fieldsArray = ESTADISTICA_FIELDS_DEF;
const { TextArea } = Input;

const WPSelectField = ({ fieldName, label, options, onChange, value }) => {
  return (
    <tr key={fieldName}>
      <th scope="row">
        <label htmlFor={fieldName}>{label}</label>
      </th>
      <td>
        <Select
          onChange={(e) => onChange(e, fieldName)}
          value={value}
          name={fieldName}
          id={fieldName}
        >
          <option value="">-- Seleccionar --</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.numeral} {option.nombre}
            </option>
          ))}
        </Select>
      </td>
    </tr>
  );
};

const WPInputField = ({ fieldName, label, onChange, value, required }) => {
  return (
    <tr key={fieldName}>
      <th scope="row">
        <label htmlFor={fieldName}>{label}</label>
      </th>
      <td>
        <Input
          name={fieldName}
          type="text"
          onChange={(e) => onChange(e, fieldName)}
          required={required}
          value={value}
        />
      </td>
    </tr>
  );
};

const WPTextAreaField = ({ fieldName, label, onChange, value, required }) => {
  return (
    <tr key={fieldName}>
      <th scope="row">
        <label htmlFor={fieldName}>{label}</label>
      </th>
      <td>
        <TextArea
          name={fieldName}
          onChange={(e) => onChange(e, fieldName)}
          style={{ height: 100, resize: 'none', scrollbarWidth: 'thin' }}
          required={required}
          value={value}
        />
      </td>
    </tr>
  );
};

const IndicadorEditorTabFicha: React.FC = () => {
  const dispath = useAppDispatch();
  const values = useAppSelector(selectEstadisticaFields);
  const validationErrors = useAppSelector(selectValidationErrors);
  const { data: clasificadores } = useGetIndiceClasificadoresQuery();
  const indiceClasificadores = new IndiceClasificadores(clasificadores || []);

  console.log(indiceClasificadores.getItemsNivel1);

  const handleChange = (e) => {
    const { name: fiendName, value } = e.target;
    dispath(setEstadisticaFieldValue({ field: fiendName, value }));
  };

  const handleSelectChange = (e) => {
    const { name: fiendName, value } = e.target;
    dispath(setEstadisticaFieldValue({ field: fiendName, value: +value }));
  };
  const getSubComponentes = () => {
    return indiceClasificadores.getSubclasificadores(values.componenteId);
  };
  const getTemasEstadisticos = () => {
    return indiceClasificadores.getSubclasificadores(values.subcomponenteId);
  };
  const getSelectFieldOptions = (fieldName: string) => {
    switch (fieldName) {
      case 'componenteId':
        return indiceClasificadores.getItemsNivel1();
      case 'subcomponenteId':
        return getSubComponentes();
      case 'temaEstadisticoId':
        return getTemasEstadisticos();
      default:
        return [];
    }
  };
  return (
    <div style={{ height: '380px' }}>
      <div className="h-full overflow-auto scroll-container pr-8">
        <form className="h-full flex flex-col justify-between">
          <table className="form-table">
            <tbody>
              {Object.entries(fieldsArray).map(([fieldName, fieldDef]) => {
                if (fieldDef.type === 'select') {
                  return (
                    <WPSelectField
                      key={fieldName}
                      label={fieldDef.label}
                      fieldName={fieldName}
                      options={getSelectFieldOptions(fieldName) || []}
                      onChange={handleSelectChange}
                      value={values[fieldName]}
                    />
                  );
                } else if (fieldDef.type === 'textarea') {
                  return (
                    <WPTextAreaField
                      key={fieldName}
                      label={fieldDef.label}
                      fieldName={fieldName}
                      onChange={handleChange}
                      value={values[fieldName]}
                      required={fieldDef.required}
                    />
                  );
                } else {
                  return (
                    <WPInputField
                      key={fieldName}
                      label={fieldDef.label}
                      fieldName={fieldName}
                      onChange={handleChange}
                      value={values[fieldName]}
                      required={fieldDef.required}
                    />
                  );
                }
              })}
            </tbody>
          </table>
          <button type="submit"> enviar</button>
        </form>
      </div>
    </div>
  );
};

export default IndicadorEditorTabFicha;
