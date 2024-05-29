import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Modal } from 'antd';
import WpDynamicField from '../../components/form/WpDynamicField';
import { FieldDef } from '../estadisticas/editor/EstadisticaFieldsDef';
import ClasificadorService from '../../services/ClasificadorService';

export interface MarcoOrdenadorWindowRef {
  open: (data) => void;
  close: () => void;
}

export const MARCO_ORDENADOR_FIELDS_DEF: Record<string, FieldDef> = {
  nivel: {
    label: 'Nivel',
    controlType: 'text',
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
};

export const MarcoOrdenadorModal = forwardRef<MarcoOrdenadorWindowRef>(
  (props, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataForm, setDataForm] = useState({
      id: null,
      nivel: '',
      nombre: '',
      numeral: '',
    });
    const open = ({ record }) => {
      const newDataForm = { ...record };
      newDataForm.nivel = newDataForm.nivel.toString();
      setDataForm(newDataForm);
      setIsModalOpen(true);
    };

    const handleOk = async () => {
      setIsModalOpen(false);
      try {
        await ClasificadorService.update(dataForm.id, dataForm);
      } catch (error) {
        console.error('Update Error:', error);
      }
    };

    const close = () => {
      setIsModalOpen(false);
    };
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));
    const handleChange = (value, fieldName) => {
      setDataForm({ ...dataForm, [fieldName]: value });
    };
    const handleTouched = (e) => {};
    return (
      <Modal
        title="Editar Marco Ordenador"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={close}
        width={700}
      >
        <form className="h-full flex flex-col justify-between">
          <table className="form-table">
            <tbody>
              {Object.entries(MARCO_ORDENADOR_FIELDS_DEF).map(
                ([fieldName, fieldDef]) => (
                  <WpDynamicField
                    fieldDef={fieldDef}
                    fieldName={fieldName}
                    validationErrors={[]}
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
      </Modal>
    );
  }
);
