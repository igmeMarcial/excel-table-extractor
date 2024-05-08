import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  FluentProvider,
  Spinner,
  webLightTheme,
} from '@fluentui/react-components';
import { Modal, Button, Table, TableColumnsType, message } from 'antd';
import { EstadisticasWorkbook } from '../../core/EstadisticasWorkbook';
import { Estadistica } from '../../types/Estadistica';
import { useCreateEstadisticaMutation } from '../../app/services/estadistica';
import { WorkbookEstadisticaItem } from '../../types/WorkbookEstadisticaItem';
import { useGetIndiceClasificadoresQuery } from '../../app/services/clasificador';
import { IndiceClasificadores } from '../../core/IndiceClasificadores';

interface EstadisticaImportRow extends WorkbookEstadisticaItem {
  key: React.Key;
  number: number;
  isImporting: boolean;
  isImported: boolean;
  importingError?: string;
  errorDatos?: string;
}
class ImportState {
  static isImportStopped = false;
}
const renderRowStatus = (row: EstadisticaImportRow) => {
  if (row.isImporting) {
    return 'Importando...';
  }
  if (row.importingError) {
    return 'Error de importación';
  }
  const messageStack = [];
  if (row.isImported) {
    messageStack.push('Importada');
  }
  if (row.confirmarRangoDatos) {
    messageStack.push('Requiere confirmar rango datos');
  }
  if (row.errorDatos) {
    messageStack.push(row.errorDatos);
  }
  return (
    <ul>
      {messageStack.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
};
const columns: TableColumnsType<EstadisticaImportRow> = [
  {
    title: 'N°',
    fixed: 'left',
    width: 36,
    render: (_, record) =>
      record.isImporting ? (
        <Spinner size="extra-tiny" title="Importando" />
      ) : (
        record.number
      ),
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
    width: 200,
    render: renderRowStatus,
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
    setIsImporting(false);
    ImportState.isImportStopped = false;
  };

  const close = () => {
    if (!isImporting) {
      setIsOpen(false);
    }
  };
  useImperativeHandle(ref, () => ({
    open,
    close,
  }));
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
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
      item.number = index + 1;
    });
    setListaEstadisticas(listaEstadisticas);
  };

  const doStartImport = () => {
    ImportState.isImportStopped = false;
    setIsImporting(true);
    saveEstadistica(0);
  };
  const stopImporting = () => {
    ImportState.isImportStopped = true;
    setIsImporting(false);
  };
  // Guarda la siguiente estadística en la lista
  const saveEstadistica = (selectionIndex: number) => {
    if (listaEstadisticas.length === 0) {
      close();
    }
    const rowKey = selectedRowKeys[selectionIndex];
    if (!rowKey) {
      setIsImporting(false);
      return;
    }
    const row = getRowByKey(rowKey);
    const model = getEstadisticaModelByKey(rowKey);
    if (model) {
      // Si no se pudo determinar el rango de valores
      const graficos = model.graficos || [];
      if (graficos.length > 0 && !graficos[0].referenciasTablaDatos) {
        row.errorDatos = 'No se puede determinar los datos a graficar';
      }
      row.isImporting = true;
      row.importingError = null;
      updateRow(row);
      postEstadistica(model)
        .then(() => {
          row.isImported = true;
          row.isImporting = false;
          updateRow(row);
        })
        .catch((err) => {
          row.isImporting = false;
          console.log(err);
          row.importingError = err;
          updateRow(row);
        })
        .finally(() => {
          if (!ImportState.isImportStopped) {
            saveEstadistica(selectionIndex + 1);
          }
        });
    }
  };
  const saveNextEstadistica = (lastIndex: number) => {
    saveEstadistica(lastIndex + 1);
  };
  const updateRow = (row: EstadisticaImportRow) => {
    setListaEstadisticas((lista) =>
      lista.map((item) => {
        if (item.key === row.key) {
          return { ...row };
        }
        return item;
      })
    );
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
  const getRowByKey = (key: React.Key): EstadisticaImportRow => {
    for (const row of listaEstadisticas) {
      if (row.key === key) {
        return row;
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
        !isImporting ? (
          <Button
            key="submit"
            type="primary"
            onClick={doStartImport}
            disabled={!hasSelection}
          >
            {ImportState.isImportStopped ? ' Reanudar' : 'Iniciar'} importación
          </Button>
        ) : (
          <Button key="submit" type="primary" onClick={stopImporting} danger>
            Detener importación
          </Button>
        ),
        <Button key="back" onClick={close} disabled={isImporting}>
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
