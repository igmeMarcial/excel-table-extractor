import { forwardRef, useImperativeHandle, useState } from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Modal } from 'antd';
import WpDynamicField from '../../components/form/WpDynamicField';
import { FieldDef } from '../estadisticas/editor/EstadisticaFieldsDef';
import { useSaveClasificadorMutation } from '../../app/services/clasificador';
import { Clasificador } from '../../types/Clasificador';
import WpSelectField from '../../components/form/WpSelectField';
import { useGetMarcosOrdenadoresQuery } from '../../app/services/marco-ordenador';
import { useAppSelector } from '../../app/hooks';
import { selectValidationErrors } from '../estadisticas/EstadisticaFormSlice';

export interface MarcoOrdenadorWindowRef {
  open: (data?: { record?: Partial<Clasificador> }) => void;
  close: () => void;
}

export const CLASIFICADORES_FIELDS_DEF: Record<string, FieldDef> = {
  nivel: {
    label: 'Nivel',
    controlType: 'number',
    required: true,
  },
  numeral: {
    label: 'Numeral',
    controlType: 'text',
    required: true,
  },
  nombre: {
    label: 'Nombre del indicador o estadística ambiental',
    controlType: 'textarea',
    required: true,
  },
  activo: {
    label: 'Activo',
    controlType: 'switch',
    dataType: 'boolean',
  },
  vigente: {
    label: 'Vigente',
    controlType: 'switch',
    dataType: 'boolean',
  },
};

const initialDataForm = {
  nivel: 0,
  nombre: '',
  numeral: '',
  activo: true,
  vigente: true,
  marcoOrdenadorId: 1, // por defecto es 1
};

const ClasificadorEditorModal = forwardRef<MarcoOrdenadorWindowRef>(
  (props, ref) => {
    const [isCreationMode, setIsCreationMode] = useState(true);
    const [saveClasificador, { isLoading: isSaving }] =
      useSaveClasificadorMutation(isCreationMode);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data = [], isLoading } = useGetMarcosOrdenadoresQuery();
    const [dataForm, setDataForm] =
      useState<Partial<Clasificador>>(initialDataForm);
    const [errors, setErrors] = useState({});
    const open = ({ record = {} }: { record?: Partial<Clasificador> } = {}) => {
      console.log(record);
      setIsCreationMode(!record.id);
      if (record.id) {
        setDataForm(record);
      }
      setIsModalOpen(true);
    };

    const validateForm = () => {
      const newErrors = {};
      for (const field in CLASIFICADORES_FIELDS_DEF) {
        if (CLASIFICADORES_FIELDS_DEF[field].required && !dataForm[field]) {
          newErrors[field] = true; // Indicar que el campo está vacío
        }
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const handleOk = async () => {
      if (!validateForm()) {
        return;
      }

      setIsModalOpen(false);
      console.log('PEPEPE');
      try {
        await saveClasificador(dataForm);
      } catch (error) {
        console.error('Update Error:', error);
      }
      setDataForm(initialDataForm);
    };

    const close = () => {
      setIsModalOpen(false);
      setDataForm(initialDataForm);
      setErrors({});
    };
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));
    const handleChange = (value, fieldName) => {
      setDataForm({ ...dataForm, [fieldName]: value });

      if (errors[fieldName]) {
        const newErrors = { ...errors };
        delete newErrors[fieldName];
        setErrors(newErrors);
      }
    };
    const handleSelectChange = (e) => {
      const { name: fiendName, value } = e.target;
      setDataForm({ ...dataForm, [fiendName]: +value });
    };
    const handleTouched = (e, fieldName) => {
      if (!dataForm[fieldName]) {
        setErrors({ ...errors, [fieldName]: true });
      }
    };
    return (
      <Modal
        title="Editar Clasificador"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={close}
        width={700}
      >
        <FluentProvider theme={webLightTheme}>
          <form className="h-full flex flex-col justify-between">
            <table className="form-table">
              <tbody>
                <WpSelectField
                  fieldDef={{
                    label: 'Marco Ordenador',
                    controlType: 'select',
                    required: true,
                  }}
                  fieldName={'marcoOrdenadorId'}
                  options={data || []}
                  onChange={handleSelectChange}
                  onTouched={handleTouched}
                  valueField="id"
                  textRenderer={(option) =>
                    `${option.numeral} ${option.nombre}`
                  }
                  value={String(dataForm['marcoOrdenadorId'])}
                  validationErrors={{ required: false }}
                />
                {Object.entries(CLASIFICADORES_FIELDS_DEF).map(
                  ([fieldName, fieldDef]) => (
                    <WpDynamicField
                      fieldDef={fieldDef}
                      fieldName={fieldName}
                      validationErrors={
                        errors[fieldName] ? { required: true } : {}
                      }
                      value={dataForm[fieldName]}
                      onChange={handleChange}
                      onTouched={handleTouched}
                      key={fieldName}
                    />
                  )
                )}
              </tbody>
            </table>
          </form>
        </FluentProvider>
      </Modal>
    );
  }
);

export default ClasificadorEditorModal;
