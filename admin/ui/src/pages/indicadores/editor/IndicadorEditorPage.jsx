import React, { useRef, useState } from 'react';
import MainLayout from '../../../layout/MainLayout';
import IndicadorEditorhHeader from './IndicadorEditorhHeader';
import IndicadorEditorTabs from './IndicadorEditorTabs';
import IndicadorEditorBottomActions from './IndicadorEditorBottomActions';

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

function IndicadorEditorPage() {
  const [formData, setFormData] = useState(initialForm);
  const [nameIndicadorForm, setNameIndicadorForm] = useState(null);

  const formRef = useRef({});
  const clickBtnRef = useRef();

  const handleChange = (fieldName, value) => {
    console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    setNameIndicadorForm(formData.nombreIndicador);
    console.log(nameIndicadorForm);
  };
  const handleSubmit = () => {
    console.log(formData);
  };

  const handleClick = () => {
    if (formRef.current && formRef.current.handleClick) {
      formRef.current.handleClick();
      console.log('click en registrar');
    } // Llamada a la función handleSubmit en el componente IndicadorEditorTabs
    console.log(formRef.current);
  };

  return (
    <MainLayout>
      <IndicadorEditorhHeader nameIndicador={nameIndicadorForm} />
      <IndicadorEditorTabs
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        ref={formRef}
      />
      <IndicadorEditorBottomActions onClick={handleClick} />
    </MainLayout>
  );
}

export default IndicadorEditorPage;
