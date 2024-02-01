import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import Input from '../../../components/Input';
import SelectAnidados from '../ficha/SelectAnidados';

const fieldsArray = {
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

const IndicadorEditorTabFicha = forwardRef(({ onChange }, ref) => {
  const [values, setValues] = useState(initialForm);

  const handleSelectChange = (event, value) => {
    console.log(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = {
      ...values,
      [name]: value,
    };
    setValues(updatedValues);
    onChange(updatedValues);
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
              <SelectAnidados onSelectChange={handleSelectChange} />
              {Object.entries(fieldsArray).map(([key, field]) => (
                <tr key={key}>
                  <th scope="row">
                    <label htmlFor={key}>{field.label}</label>
                  </th>
                  <td>
                    <Input
                      name={key}
                      type={field.type}
                      text={field.label}
                      onChange={handleChange}
                      required={field.required}
                    />
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
