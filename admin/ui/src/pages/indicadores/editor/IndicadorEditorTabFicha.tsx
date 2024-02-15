import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Input from '../../../components/Input';
import { makeStyles, Select } from '@fluentui/react-components';
import { useFetch } from '../../../hooks/useFetch';


interface FieldsArray {
    label: string;
    type: 'select' | 'text' | 'url' | 'email'; // Añadí los tipos de campo adicionales
    required: boolean;
    default: string;
  
}

interface SelectionLevels {
  componente: string;
  subComponente: string;
  temaEstadistico: string;
}
interface IndicadorEditorTabFichaProps {
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
const useStyles = makeStyles({
  selectInput: {
    width: '25em',
  },
});

const fieldsArray: Record<string, FieldsArray> = {
  componente: {
    label: 'Componente',
    type: 'select',
    required: true,
    default: '',
  },
  subComponente: {
    label: 'Sub componente',
    type: 'select',
    required: true,
    default: '',
  },
  temaEstadistico: {
    label: 'Tema estadístico',
    type: 'select',
    required: true,
    default: '',
  },
  nombre: {
    label: 'Nombre del indicador o estadística ambiental',
    type: 'text',
    required: false,
    default: '',
  },
  descripcionDefinicion: {
    label: 'Descripción/Definición',
    type: 'text',
    required: true,
    default: '',
  },
  unidadDeMedida: {
    label: 'Unidad de medida',
    type: 'text',
    required: true,
    default: '',
  },
  formulaCalculo: {
    label: 'Fórmula de cálculo',
    type: 'text',
    required: true,
    default: '',
  },
  metodologiaCalculo: {
    label: 'Metodología de cálculo',
    type: 'text',
    required: true,
    default: '',
  },
  fuente: { label: 'Fuente', type: 'text', required: true, default: '' },
  unidadOrganicaGeneradora: {
    label: 'Unidad orgánica generadora',
    type: 'text',
    required: true,
    default: '',
  },
  url: { label: 'URL', type: 'url', required: true, default: '' },
  periodicidadGeneracion: {
    label: 'Periodicidad de generación',
    type: 'text',
    required: true,
    default: '',
  },
  periodicidadEntregaRegistro: {
    label: 'Periodicidad de entrega/registro',
    type: 'text',
    required: true,
    default: '',
  },
  periodoSerieTiempo: {
    label: 'Periodo de serie de tiempo',
    type: 'text',
    required: true,
    default: '',
  },
  ambitoGeografico: {
    label: 'Ámbito geográfico',
    type: 'text',
    required: true,
    default: '',
  },
  limitaciones: {
    label: 'Limitaciones',
    type: 'text',
    required: true,
    default: '',
  },
  relacionObjetivos: {
    label: 'Relación con objetivos nacionales',
    type: 'text',
    required: true,
    default: '',
  },
  relacionIniciativasInternacionales: {
    label: 'Relación con iniciativas internacionales',
    type: 'text',
    required: true,
    default: '',
  },
  correoElectronico: {
    label: 'Correo electrónico',
    type: 'email',
    required: true,
    default: '',
  },
  wpDefaultFieldLabel: {
    label: 'WP/default-field-label',
    type: 'text',
    required: true,
    default: '',
  },
  telefonoCelular: {
    label: 'Teléfono/celular',
    type: 'text',
    required: true,
    default: '',
  },
};

const initialForm = Object.fromEntries(
  Object.entries(fieldsArray)
    .filter(([key, field]) => field.default !== undefined)
    .map(([key, field]) => [key, field.default])
);

const IndicadorEditorTabFicha = forwardRef(({ onChange }:IndicadorEditorTabFichaProps, ref) => {
  const styles = useStyles();
  const [selectionLevels, setSelectionLevels] = useState<SelectionLevels>({
    componente: '',
    subComponente: '',
    temaEstadistico: '',
  });

  const [values, setValues] = useState<any>(initialForm);

  //Lamada de apis
  const { data: componentApiData } = useFetch(urls.componenteUrl);
  const { data: subComponentApiData } = useFetch(urls.subComponentesUrl);
  const { data: temasEstadisticoApiData } = useFetch(urls.temasEstadisticosUrl);

  const handleChange = (e, fieldKey) => {
    const { name, value } = e.target;

    if (fieldKey === 'componente') {
      setSelectionLevels((prevLevels) => ({
        ...prevLevels,
        componente: value,
        subComponente: '', // Reset subComponente
        temaEstadistico: '', // Reset temaEstadistico
      }));
    } else if (fieldKey === 'subComponente' || fieldKey === 'temaEstadistico') {
      setSelectionLevels((prevLevels) => ({
        ...prevLevels,
        [fieldKey]: value,
      }));
    }

    const updatedValues = {
      ...values,
      [name]:
        fieldKey === 'componente'
          ? buscarElementoPorId(value, componentApiData?.data)
          : fieldKey === 'subComponente'
          ? buscarElementoPorId(value, subComponentApiData?.data)
          : value,
    };

    setValues(updatedValues);
    onChange(updatedValues);
  };

  const buscarElementoPorId = (id:string, array:any[]) => {
    const elemento = array.find((elemento) => elemento.id === id);
    return elemento ? elemento.nombre : '';
  };

  const getValues = () => {
    return values;
  };
  useImperativeHandle(ref, () => ({
    getValues,
  }));

  return (
    <div style={{ height: '380px' }}>
      <div className="h-full overflow-auto scroll-container ">
        <form
          className="h-full flex flex-col justify-between  
        "
        >
          <table className="form-table">
            <tbody>
              {Object.entries(fieldsArray).map(([key, field]) => (
                <tr key={key}>
                  <th scope="row">
                    <label htmlFor={key}>{field.label}</label>
                  </th>
                  <td>
                    {field.type === 'select' ? (
                      <Select
                        onChange={(e) => handleChange(e, key)}
                        value={selectionLevels[key]}
                        name={key}
                        id={key}
                        className={styles.selectInput}
                        appearance="outline"
                      >
                        <option value="">Seleccione {field.label}</option>
                        {key === 'componente' &&
                          componentApiData?.data?.map((comp) => (
                            <option key={comp.id} value={comp.id}>
                              {comp.nombre}
                            </option>
                          ))}
                        {key === 'subComponente' &&
                          subComponentApiData?.data
                            ?.filter(
                              (x) =>
                                x.componenteId === selectionLevels.componente
                            )
                            .map((subcomp) => (
                              <option key={subcomp.id} value={subcomp.id}>
                                {subcomp.nombre}
                              </option>
                            ))}
                        {key === 'temaEstadistico' &&
                          temasEstadisticoApiData?.data
                            ?.filter(
                              (x) =>
                                x.subcomponenteId ===
                                selectionLevels.subComponente
                            )
                            .map((tema) => (
                              <option key={tema.nombre} value={tema.nombre}>
                                {tema.nombre}
                              </option>
                            ))}
                      </Select>
                    ) : (
                      <Input
                        name={key}
                        type={field.type}
                        text={field.label}
                        onChange={(e) => handleChange(e, key)}
                        required={field.required}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" style={{ visibility: 'hidden' }} />
        </form>
      </div>
    </div>
  );
});

export default IndicadorEditorTabFicha;
