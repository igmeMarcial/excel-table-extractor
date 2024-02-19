import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Select } from '@fluentui/react-components';
import { useFetch } from '../../../hooks/useFetch';
import { EstadisticaModel } from '../../../models/EstadisticaModel';
import { Input } from 'antd';
import { ESTADISTICA_FIELDS_DEF } from './EstadisticaFieldsDef';

interface IndicadorEditorTabFichaProps {
  indicatorData: any;
  onChange: (values: any) => void;
}
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

const defalultValues: EstadisticaModel = Object.fromEntries(
  Object.entries(fieldsArray)
    .filter(([key, field]) => field.default !== undefined)
    .map(([key, field]) => [key, field.default])
);
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
              {option.nombre}
            </option>
          ))}
        </Select>
      </td>
    </tr>
  );
};

const WPInputField = ({ fieldName, label, onChange, value }) => {
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
          required
        />
      </td>
    </tr>
  );
};

const getDefaultValues = (): EstadisticaModel => {
  return defalultValues;
};
const IndicadorEditorTabFicha = forwardRef(
  ({ onChange, indicatorData }: IndicadorEditorTabFichaProps, ref) => {
    const [values, setValues] = useState<EstadisticaModel>(getDefaultValues());

    //Lamada de apis
    const { data: listaCoponentes } = useFetch(urls.componenteUrl);
    const { data: listaSubcomponentes } = useFetch(urls.subComponentesUrl);
    const { data: listaTemasEstadisticos } = useFetch(
      urls.temasEstadisticosUrl
    );

    useEffect(() => {
      if (indicatorData && indicatorData.length > 0) {
        console.log(indicatorData);
      }
    }, [indicatorData]);

    const handleChange = (e, fieldKey) => {
      const { name: fiendName, value } = e.target;
      const updatedValues = {
        ...values,
        [fiendName]: value,
      };
      setValues(updatedValues);
      onChange(updatedValues);
    };

    const getValues = () => {
      return values;
    };
    const getSubComponentes = () => {
      console.log('call: getSubComponentes');
      return (listaSubcomponentes?.data || []).filter(
        (x) => x.componenteId === values.componenteId
      );
    };
    const getTemasEstadisticos = () => {
      return (listaTemasEstadisticos?.data || []).filter(
        (x) => x.subcomponenteId === values.subcomponenteId
      );
    };
    const getSelectFieldOptions = (fieldName: string) => {
      switch (fieldName) {
        case 'componenteId':
          return listaCoponentes?.data || [];
        case 'subcomponenteId':
          return getSubComponentes();
        case 'temaEstadisticoId':
          return getTemasEstadisticos();
        default:
          return [];
      }
    };
    useImperativeHandle(ref, () => ({
      getValues,
    }));

    const printValues = () => {
      console.log('values', values);
    };

    return (
      <div style={{ height: '380px' }}>
        <div className="h-full overflow-auto scroll-container ">
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
                        onChange={handleChange}
                        value={values[fieldName]}
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
                      />
                    );
                  }
                })}
              </tbody>
            </table>
            <button type="button" onClick={printValues}>
              Print values
            </button>
            <button type="submit"> enviar</button>
          </form>
        </div>
      </div>
    );
  }
);

export default IndicadorEditorTabFicha;
