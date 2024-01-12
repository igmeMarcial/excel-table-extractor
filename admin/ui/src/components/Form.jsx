import React from 'react'

import {
  makeStyles,
  shorthands,
  useId,
  Input,
  Label,
   Button
} from "@fluentui/react-components";
import { useForm } from '../hooks/useForm';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    maxWidth: "400px",
    // Stack the label above the field (with 2px gap per the design system)
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
    overflowY:"auto"
  },
  wrapper: {
    columnGap: "15px",
    display: "flex",
  },
  btn:{
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#f8f8f8',
    backgroundColor: '#2271B1',
  
  }
});

const initialForm = {
  temaEstadistico: "",
  nombre: "",
  descripcion: "",
  finalidad: "",
  limitaciones: "",
  metodologia: "",
  fuenteDeInformacion: "",
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
    <div className="border border-solid border-white ">
      <form onSubmit={handleSubmit} className='h-full flex flex-col justify-between'>
        <div className='divScroll overflow-x-auto bg-white max-h-96' style={{scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className={styles.root}>
            <div className='mt-3'>
              <Label  size="large" htmlFor="temaEstadistico">
                Tema estadístico
              </Label>
              <Input
                size="large"
                id="temaEstadistico"
                type="text"
                name="temaEstadistico"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.temaEstadistico}
                required
              />
            </div>
            <div className=''>
              <Label size="large" htmlFor="nombre">
                Nombre
              </Label>
              <Input
                size="large"
                type="text"
                id="nombre"
                name="nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.nombre}
                required
              />
            </div>
            <div className=''>
              <Label size="large" htmlFor="descripcion">
                Descripción
              </Label>
              <Input
                size="large"
                type="text"
                id="descripcion"
                name="descripcion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.descripcion}
                required
              />
            </div>
            <div className=''>
              <Label size="large" htmlFor="finalidad">
                Finalidad
              </Label>
              <Input
                size="large"
                type="text"
                id="finalidad"
                name="finalidad"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.finalidad}
                required
              />
            </div>
            <div className=''>
              <Label size="large" htmlFor="limitaciones">
                Limitaciones
              </Label>
              <Input
                size="large"
                type="text"
                id="limitaciones"
                name="limitaciones"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.limitaciones}
                required
              />
            </div>
            <div className=''>
              <Label size="large" htmlFor="metodologia">
                Metodología
              </Label>
              <Input
                size="large"
                type="text"
                id="metodologia"
                name="metodologia"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.metodologia}
                required
              />
            </div>
            <div className=''>
              <Label size="large" htmlFor="fuenteDeInformacion">
                Fuente de Información
              </Label>
              <Input
                size="large"
                type="text"
                id="fuenteDeInformacion"
                name="fuenteDeInformacion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.fuenteDeInformacion}
                required
              />
            </div>
          </div>
        </div>
        <div className='mt-6 bg-gray-100 py-3'>
          <div className={styles.wrapper}>
            <Button className={styles.btn} appearance="secondary" type="submit" shape="square">
              Guardar
            </Button>
            <Button shape="square">Cancelar</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form