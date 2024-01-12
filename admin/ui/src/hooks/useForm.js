import { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

// Hook personalizado para gestionar la lógica del formulario
export const useForm = (initialForm, validateForm) => {
    // Estado para almacenar los valores del formulario
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Función que maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
//console.log(e.target.value)
// Actualiza el estado del formulario con los nuevos valores
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Función que maneja eventos de desenfoque en los campos del formulario
  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    
 console.log(form)
    // Si no hay errores, procede con el envío del formulario
    /*
    if (Object.keys(errors).length === 0) {
      alert("Enviando Formulario");
      setLoading(true);
      console.log(form)
    //   helpHttp()
    //     .post("https://formsubmit.co/ajax/igmemarcial@gmail.com", {
    //       body: form,
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //       },
    //     })
    //     .then((res) => {
    //       setLoading(false);
    //       setResponse(true);
    //       setForm(initialForm);
    //       setTimeout(() => setResponse(false), 5000);
    //     });
    } else {
      return;
    }
    */
  };


  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};