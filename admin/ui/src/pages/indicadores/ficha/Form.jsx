import React, { forwardRef, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import Input from '../../../components/Input';
import SelectAnidados from './SelectAnidados';

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

  return (
    <form
      style={{ height: '100%' }}
      onSubmit={handleSubmit}
      className="h-full flex flex-col justify-between  
        "
    >
      <table className="form-table">
        <tbody>
          <SelectAnidados />
          {fields.map((field) => (
            <tr key={field.name}>
              <th scope="row">
                <label htmlFor={field.name}>{field.label}</label>
              </th>
              <td>
                {field.type === 'select' ? (
                  <div>en dessarrollo</div>
                ) : (
                  <Input
                    name={field.name}
                    type={field.type}
                    text={field.label}
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
