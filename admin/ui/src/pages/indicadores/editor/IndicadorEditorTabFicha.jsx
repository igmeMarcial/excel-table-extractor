import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import Input from '../../../components/Input';
import SelectAnidados from '../ficha/SelectAnidados';

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

const IndicadorEditorTabFicha = forwardRef(
  ({ formData, onChange, onSubmit }, ref) => {
    console.log(ref);

    const handleSelectChange = (name, value) => {
      // console.log(name, value);
      console.log(value);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      onChange(name, value); // onChange del padre
    };

    useEffect(() => {
      console.log(ref.current); // Agrega esta línea para imprimir el ref.current
    }, []); // Se ejecutará solo una vez después del montaje del componente
    const handleSubmit = () => {
      console.log('IndicadorEditorTabFicha handleSubmit');
    };

    useImperativeHandle(ref, () => ({
      handleSubmit,
    }));

    return (
      <div style={{ height: '400px' }}>
        <div className="h-full overflow-auto scroll-container ">
          <form
            onSubmit={handleSubmit}
            className="h-full flex flex-col justify-between  
        "
          >
            <table className="form-table">
              <tbody>
                <SelectAnidados onSelectChange={handleSelectChange} />
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
                          // value={form[field.name]}
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
  }
);

export default IndicadorEditorTabFicha;
