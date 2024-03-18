import { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal } from 'antd';
import { Button } from '@fluentui/react-button';
import DataTable from '../../../../components/DataTable';
import { useAppSelector } from '../../../../app/hooks';
import { selectEstadisticaData } from '../../EstadisticaFormSlice';

interface GraficoSeriesConfigWindowProps {}
const GraficoSeriesConfigWindow = forwardRef(
  (props: GraficoSeriesConfigWindowProps, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const data = useAppSelector(selectEstadisticaData);
    // Metodos expuestos
    const open = () => {
      setIsOpen(true);
    };
    const close = () => {
      setIsOpen(false);
    };
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    return (
      <Modal
        title="Configuración de series"
        open={isOpen}
        className="bg-gray-400"
        onCancel={close}
      >
        <DataTable data={data} />
        <Button appearance="subtle" onClick={() => close()}>
          Cerrar
        </Button>
      </Modal>
    );
  }
);

export default GraficoSeriesConfigWindow;
