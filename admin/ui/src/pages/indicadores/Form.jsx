import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { makeStyles, shorthands, Select } from '@fluentui/react-components';
import { useForm } from '../../hooks/useForm';
import CustomInput from './CustomInput';
import { helpHttp } from '../../helpers/helpHttp';
import SelectListForm from './SelectListForm';
import { useFetch } from '../../hooks/useFetch';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
    maxWidth: '400px',
    '> div': {
      display: 'flex',
      flexDirection: 'column',
      ...shorthands.gap('2px'),
    },
    overflowY: 'auto',
  },
  wrapper: {
    columnGap: '15px',
    display: 'flex',
  },
  btn: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#f8f8f8',
    backgroundColor: '#2271B1',
  },
  selectInput: {
    width: '25em',
  },
});

const initialForm = {
  componente: '',
  subComponente: '',
  temaEstadistico: '',
  nombreIndicador: '',
  descripcionDefinicion: '',
  unidadDeMedida: '',
  formulaCalculo: '',
  metodologiaCalculo: '',
  fuente: '',
  unidadOrganicaGeneradora: '',
  url: '',
  periodicidadGeneracion: '',
  periodicidadEntregaRegistro: '',
  periodoSerieTiempo: '',
  ambitoGeografico: '',
  limitaciones: '',
  relacionObjetivos: '',
  relacionIniciativasInternacionales: '',
  correoElectronico: '',
  wpDefaultFieldLabel: '',
  telefonoCelular: '',
};

const validationsForm = (form) => {
  console.log('manejo de errores aqui, validaciones');
};

const fields = [
  {
    name: 'componente',
    label: 'Componente',
    type: 'select',
    options: ['componente 1', 'componente 2', 'componente 3'],
  },
  {
    name: 'subComponente',
    label: 'Sub componente',
    type: 'select',
    options: ['subComponente 1', 'subComponente 2', 'subComponente 3'],
  },
  {
    name: 'temaEstadistico',
    label: 'Tema estadístico',
    type: 'select',
    options: [
      '6.1.2 Gasto de empresas privadas...',
      '6.1.2 Gasto de empresas privadas...',
      '6.1.2 Gasto de empresas privadas...',
    ],
  },
  {
    name: 'nombreIndicador',
    label: 'Nombre del indicador o estadística ambiental',
    type: 'text',
    required: false,
  },
  {
    name: 'descripcionDefinicion',
    label: 'Descripción/Definición',
    type: 'text',
    required: true,
  },
  {
    name: 'unidadDeMedida',
    label: 'Unidad de medida',
    type: 'text',
    required: true,
  },
  {
    name: 'formulaCalculo',
    label: 'Fórmula de cálculo',
    type: 'text',
    required: true,
  },
  {
    name: 'metodologiaCalculo',
    label: 'Metodología de cálculo',
    type: 'text',
    required: true,
  },
  { name: 'fuente', label: 'Fuente', type: 'text', required: true },
  {
    name: 'unidadOrganicaGeneradora',
    label: 'Unidad orgánica generadora',
    type: 'text',
    required: true,
  },
  { name: 'url', label: 'URL', type: 'url', required: true },
  {
    name: 'periodicidadGeneracion',
    label: 'Periodicidad de generación',
    type: 'text',
    required: true,
  },
  {
    name: 'periodicidadEntregaRegistro',
    label: 'Periodicidad de entrega/registro',
    type: 'text',
    required: true,
  },
  {
    name: 'periodoSerieTiempo',
    label: 'Periodo de serie de tiempo',
    type: 'text',
    required: true,
  },
  {
    name: 'ambitoGeografico',
    label: 'Ámbito geográfico',
    type: 'text',
    required: true,
  },
  { name: 'limitaciones', label: 'Limitaciones', type: 'text', required: true },
  {
    name: 'relacionObjetivos',
    label: 'Relación con objetivos nacionales',
    type: 'text',
    required: true,
  },
  {
    name: 'relacionIniciativasInternacionales',
    label: 'Relación con iniciativas internacionales',
    type: 'text',
    required: true,
  },
  {
    name: 'correoElectronico',
    label: 'Correo electrónico',
    type: 'email',
    required: true,
  },
  {
    name: 'wpDefaultFieldLabel',
    label: 'WP/default-field-label',
    type: 'text',
    required: true,
  },
  {
    name: 'telefonoCelular',
    label: 'Teléfono/celular',
    type: 'text',
    required: true,
  },
];

const Form = forwardRef((props, ref) => {
  const [componente, setComponente] = useState(null);
  const [subComponentes, setSubComponentes] = useState(null);
  const [temasEstadisticos, setTemasEstadisticos] = useState(null);

  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm);

  //select anidadas

  const componenteUrl =
    'http://localhost:85/index.php?rest_route=/aesa/v1/mdea/componentes';
  const subComponentesUrl =
    'http://localhost:85/index.php?rest_route=/aesa/v1/mdea/subcomponentes';
  const temasEstadisticosUrl =
    'http://localhost:85/index.php?rest_route=/aesa/v1/mdea/temas-estadisticos';

  const { data: componenteData, error: componenteError } =
    useFetch(componenteUrl);
  const { data: subComponentesData, error: subComponentesError } =
    useFetch(subComponentesUrl);
  const { data: temasEstadisticosData, error: temasEstadisticosError } =
    useFetch(temasEstadisticosUrl);

  useEffect(() => {
    if (
      componenteData &&
      componenteData.data &&
      componenteData.data.length > 0
    ) {
      setComponente(componenteData.data);
      // console.log(componenteData);
      // console.log(componenteData.data);
    }
  }, [componenteData]);

  useEffect(() => {
    if (
      subComponentesData &&
      subComponentesData.data &&
      subComponentesData.data.length > 0
    ) {
      setSubComponentes(updateSubcomponentes(subComponentesData.data, '1'));
      fields.forEach((field) => {
        if (field.name === 'subComponente') {
          field.options = updateSubcomponentes(subComponentesData.data, '1');
          //  initialForm.componente = componenteOptions[0];
          console.log(field.options);
        }
      });
    }
  }, [subComponentesData]);

  const updateSubcomponentes = (data, componenteIdToSearch) => {
    const results = data.filter(
      (object) => object.componenteId === componenteIdToSearch
    );
    return results;
  };

  //fin de select anidadas

  const styles = useStyles();

  return (
    <form
      style={{ height: '100%' }}
      onSubmit={handleSubmit}
      className="h-full flex flex-col justify-between  
        "
    >
      <table className="form-table">
        <tbody>
          {fields.map((field) => (
            <tr key={field.name}>
              <th scope="row">
                <label htmlFor={field.name}>{field.label}</label>
              </th>
              <td>
                {field.type === 'select' ? (
                  <SelectListForm
                    styles={styles}
                    title={field.name}
                    data={
                      field.name === 'componente'
                        ? componente ?? ['Cargando']
                        : field.name === 'subComponente'
                        ? subComponentes ?? ['Cargando']
                        : field.name === 'temaEstadistico'
                        ? ['ddd']
                        : ['s']
                    }
                    handleChange={handleChange}
                    value={form[field.name]}
                  />
                ) : (
                  <CustomInput
                    name={field.name}
                    type={field.type}
                    text={field.label}
                    handleBlur={handleBlur}
                    onChange={handleChange}
                    value={form[field.name]}
                    required={field.required}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button ref={ref} type="submit" style={{ visibility: 'hidden' }} />
    </form>
  );
});
export default Form;
