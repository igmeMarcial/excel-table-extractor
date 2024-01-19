import React from 'react';

import {
  makeStyles,
  shorthands,
  Select,
} from '@fluentui/react-components';
import { useForm } from '../../hooks/useForm';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
    maxWidth: '400px',
    // Stack the label above the field (with 2px gap per the design system)
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
  selectInput:{
    width:"25em"
  }
});

const initialForm = {
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
  //   let errors = {};
  //   let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  //   let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  //   let regexComments = /^.{1,255}$/;
  //   if (!form.name.trim()) {
  //     errors.name = "El campo 'Nombre' es requerido";
  //   } else if (!regexName.test(form.name.trim())) {
  //     errors.name = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
  //   }
  //   if (!form.email.trim()) {
  //     errors.email = "El campo 'Email' es requerido";
  //   } else if (!regexEmail.test(form.email.trim())) {
  //     errors.email = "El campo 'Email' es incorrecto";
  //   }
  //   if (!form.subject.trim()) {
  //     errors.subject = "El campo 'Asunto a tratar' es requerido";
  //   }
  //   if (!form.comments.trim()) {
  //     errors.comments = "El campo 'Comentarios' es requerido";
  //   } else if (!regexComments.test(form.comments.trim())) {
  //     errors.comments =
  //       "El campo 'Comentarios' no debe exceder los 255 caracteres";
  //   }
  //   return errors;
};

function Form() {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm);

  const styles = useStyles();

  return (
    <div className="  h-full ">
      <form
        onSubmit={handleSubmit}
        className="h-full flex flex-col justify-between"
      >
        <div
          style={{ maxHeight: '450px' }}
          className="scroll-container overflow-auto  w-full"
        >
          <table className="form-table">
            <tbody>
              <tr>
                <th scope="row">
                  <label htmlFor="temaEstadistico">Tema estadístico</label>
                </th>
                <td>
                  {/* <select
                    name="temaEstadistico"
                    id="temaEstadistico"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.temaEstadistico}
                    required
                  >
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                    
                  </select> */}
                  <Select
                    name="temaEstadistico"
                    id="temaEstadistico"
                    className={styles.selectInput}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.temaEstadistico}
                    required
                    appearance="outline"
                  >
                    <option>
                      6.1.2 Gasto de empresas privadas, instituciónes sin fines
                      de lucro y hogares en protección ambiental y en gestión de
                      recursos naturales
                    </option>
                    <option>
                      6.1.2 Gasto de empresas privadas, instituciónes sin fines
                      de lucro y hogares en protección ambiental y en gestión de
                      recursos naturales
                    </option>
                    <option>
                      6.1.2 Gasto de empresas privadas, instituciónes sin fines
                      de lucro y hogares en protección ambiental y en gestión de
                      recursos naturales
                    </option>
                  </Select>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="nombreIndicador">
                    Nombre del indicador o estadística ambiental
                  </label>
                </th>
                <td>
                  <input
                    name="nombreIndicador"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.nombreIndicador}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">
                  <label htmlFor="descripcionDefinicion">
                    Descripción/Definición
                  </label>
                </th>
                <td>
                  <input
                    name="descripcionDefinicion"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.descripcionDefinicion}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">
                  <label htmlFor="unidadDeMedida">Unidad de medida</label>
                </th>
                <td>
                  <input
                    name="unidadDeMedida"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.unidadDeMedida}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">
                  <label htmlFor="formulaCalculo">Fórmula de cálculo</label>
                </th>
                <td>
                  <input
                    name="formulaCalculo"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.formulaCalculo}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="metodologiaCalculo">
                    Metodología de cálculo
                  </label>
                </th>
                <td>
                  <input
                    name="metodologiaCalculo"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.metodologiaCalculo}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="fuente">Fuente</label>
                </th>
                <td>
                  <input
                    name="fuente"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.fuente}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="unidadOrganicaGeneradora">
                    Unidad orgánica generadora
                  </label>
                </th>
                <td>
                  <input
                    name="unidadOrganicaGeneradora"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.unidadOrganicaGeneradora}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="url">URL</label>
                </th>
                <td>
                  <input
                    name="url"
                    type="url"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.url}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="periodicidadGeneracion">
                    Periodicidad de generación
                  </label>
                </th>
                <td>
                  <input
                    name="periodicidadGeneracion"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.periodicidadGeneracion}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="periodicidadEntregaRegistro">
                    Periodicidad de entrega/registro
                  </label>
                </th>
                <td>
                  <input
                    name="periodicidadEntregaRegistro"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.periodicidadEntregaRegistro}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="periodoSerieTiempo">
                    Periodo de serie de tiempo
                  </label>
                </th>
                <td>
                  <input
                    name="periodoSerieTiempo"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.periodoSerieTiempo}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="ambitoGeografico">Ámbito geográfico</label>
                </th>
                <td>
                  <input
                    name="ambitoGeografico"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.ambitoGeografico}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">
                  <label htmlFor="limitaciones">Limitaciones</label>
                </th>
                <td>
                  <input
                    name="limitaciones"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.limitaciones}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th scope="row">
                  <label htmlFor="relacionObjetivos">
                    Relación con objetivos nacionales
                  </label>
                </th>
                <td>
                  <input
                    name="relacionObjetivos"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.relacionObjetivos}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="relacionIniciativasInternacionales">
                    Relación con iniciativas internacionales
                  </label>
                </th>
                <td>
                  <input
                    name="relacionIniciativasInternacionales"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.relacionIniciativasInternacionales}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="correoElectronico">Correo electrónico</label>
                </th>
                <td>
                  <input
                    name="correoElectronico"
                    type="email"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.correoElectronico}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="wpDefaultFieldLabel">
                    WP/default-field-label
                  </label>
                </th>
                <td>
                  <input
                    name="wpDefaultFieldLabel"
                    type="text"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.wpDefaultFieldLabel}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="telefonoCelular">Teléfono/celular</label>
                </th>
                <td>
                  <input
                    name="telefonoCelular"
                    type="tel"
                    className="regular-text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.telefonoCelular}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

export default Form;
