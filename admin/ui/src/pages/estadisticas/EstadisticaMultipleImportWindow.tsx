import { forwardRef, useImperativeHandle, useState } from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Modal, Button, Table, TableColumnsType } from 'antd';
import { EstadisticasWorkbook } from '../../core/EstadisticasWorkbook';
import { Estadistica } from '../../types/Estadistica';
import { useCreateEstadisticaMutation } from '../../app/services/estadistica';
import { WorkbookEstadisticaItem } from '../../types/WorkbookEstadisticaItem';
import { useGetIndiceClasificadoresQuery } from '../../app/services/clasificador';
import { IndiceClasificadores } from '../../core/IndiceClasificadores';

interface EstadisticaImportRow extends WorkbookEstadisticaItem {
  key: React.Key;
}

const columns: TableColumnsType<EstadisticaImportRow> = [
  {
    title: 'N°',
    fixed: 'left',
    width: 36,
    render: (_, record, index) => index + 1,
  },
  {
    title: 'Estadística',
    dataIndex: 'nombre',
  },
  {
    title: 'Ficha técnica',
    dataIndex: 'hojaFicha',
    width: 120,
  },
  {
    title: 'Hoja de datos',
    dataIndex: 'hojaDatos',
    width: 120,
  },
  {
    title: 'Rango datos',
    dataIndex: 'rangoDatos',
    width: 120,
  },
  {
    title: 'Estado',
    fixed: 'right',
    width: 80,
    render: (_, record, index) => index + 1,
  },
];

interface EstadisticaMultipleImportWindowProps {}
export interface EstadisticaMultipleImportWindowDataInput {
  estadisticasWb: EstadisticasWorkbook;
}
export interface EstadisticaMultipleImportWindowRef {
  open: (data: EstadisticaMultipleImportWindowDataInput) => void;
  close: () => void;
}

const EstadisticaMultipleImportWindow = forwardRef<
  EstadisticaMultipleImportWindowRef,
  EstadisticaMultipleImportWindowProps
>((props, ref) => {
  const [estadisticasWb, setEstadisticasWb] =
    useState<EstadisticasWorkbook>(null);
  const [listaEstadisticas, setListaEstadisticas] = useState<
    EstadisticaImportRow[]
  >([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { data: clasificadores } = useGetIndiceClasificadoresQuery();
  const indiceClasificadores = new IndiceClasificadores(clasificadores || []);
  const [postEstadistica, { isLoading: isSaving }] =
    useCreateEstadisticaMutation();

  const open = ({
    estadisticasWb,
  }: EstadisticaMultipleImportWindowDataInput) => {
    setEstadisticasWb(estadisticasWb);
    updateListaEstadisticas(estadisticasWb);
    setIsOpen(true);
  };

  const close = () => {
    setIsCancelled(true);
    setIsOpen(false);
  };
  useImperativeHandle(ref, () => ({
    open,
    close,
  }));
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelection = selectedRowKeys.length > 0;
  const updateListaEstadisticas = (estadisticasWb) => {
    const listaEstadisticas = estadisticasWb.getListaEstadisticas();
    // Set keys
    listaEstadisticas.forEach((item, index) => {
      item.key = item.id;
    });
    setListaEstadisticas(listaEstadisticas);
  };

  const doStartImport = () => {
    console.log('doStartImport');
    setIsImporting(true);
    saveEstadistica(0);
  };
  // Guarda la siguiente estadística en la lista
  const saveEstadistica = (selectionIndex: number) => {
    const key = selectedRowKeys[selectionIndex];
    if (!key || isCancelled) {
      setIsImporting(false);
      return;
    }
    const model = getEstadisticaModelByKey(key);
    if (model) {
      postEstadistica(model)
        .then(() => {
          // Guarda la siguiente estadística
          saveEstadistica(selectionIndex + 1);
        })
        .catch(() => {
          setIsCancelled(true);
        });
    }
  };
  // Obtiene la estadística por su key
  const getEstadisticaModelByKey = (key: React.Key): Estadistica => {
    for (const rowModel of listaEstadisticas) {
      if (rowModel.key === key) {
        return estadisticasWb.getEstadistica(rowModel, indiceClasificadores);
      }
    }
    return null;
  };
  return (
    <Modal
      title="Importar estadísticas"
      open={isOpen}
      className="h-screen"
      width={960}
      onCancel={close}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={doStartImport}
          disabled={!hasSelection || isImporting}
          loading={isImporting}
        >
          {isImporting ? 'Importando...' : 'Iniciar importación'}
        </Button>,
        <Button key="back" onClick={close}>
          Cancelar
        </Button>,
      ]}
      styles={{ footer: { display: 'flex' } }}
    >
      <FluentProvider theme={webLightTheme}>
        <div>
          <Table
            columns={columns}
            dataSource={listaEstadisticas}
            size="small"
            bordered
            scroll={{ y: 388 }}
            pagination={false}
            rowSelection={rowSelection}
          />
        </div>
      </FluentProvider>
    </Modal>
  );
});

export default EstadisticaMultipleImportWindow;
