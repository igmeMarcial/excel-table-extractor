import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  FluentProvider,
  Spinner,
  webLightTheme,
} from '@fluentui/react-components';
import { Modal, Button, Table, TableColumnsType } from 'antd';
import { EstadisticasWorkbook } from '../../core/EstadisticasWorkbook';
import { Estadistica } from '../../types/Estadistica';
import { useCreateEstadisticaMutation } from '../../app/services/estadistica';
import { WorkbookEstadisticaItem } from '../../types/WorkbookEstadisticaItem';
import { useGetIndiceClasificadoresQuery } from '../../app/services/clasificador';
import { IndiceClasificadores } from '../../core/IndiceClasificadores';
import { useDispatch } from 'react-redux';
import { api } from '../../app/services/api';

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
    return 'Error de importación: ' + row.importingError;
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
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [totalImported, setTotalImported] = useState<number>(0);
  const [lastProcessedIndex, setLastProcessedIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const { data: clasificadores } = useGetIndiceClasificadoresQuery();
  const indiceClasificadores = new IndiceClasificadores(clasificadores || []);
  const [postEstadistica] = useCreateEstadisticaMutation();

  const open = ({
    estadisticasWb,
  }: EstadisticaMultipleImportWindowDataInput) => {
    setEstadisticasWb(estadisticasWb);
    updateListaEstadisticas(estadisticasWb);
    setIsOpen(true);
    setIsImporting(false);
    setTotalImported(0);
    setLastProcessedIndex(-1);
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
    saveEstadistica(lastProcessedIndex + 1);
  };
  const stopImporting = () => {
    ImportState.isImportStopped = true;
    setIsImporting(false);
  };
  const finalizeImporting = () => {
    dispatch(api.util.invalidateTags([{ type: 'Estadistica', id: 'LIST' }]));
    close();
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
        .then((response: any) => {
          row.isImporting = false;
          if (response.error) {
            console.error(response.error);
            row.importingError = response.error.data.message;
          }
          row.isImported = !response.error;
          if (row.isImported) {
            setTotalImported((total) => total + 1);
          }
          updateRow(row);
        })
        .catch((err) => {
          row.isImporting = false;
          console.error(err);
          row.importingError = err;
          updateRow(row);
        })
        .finally(() => {
          setLastProcessedIndex((state) => selectionIndex);
          if (!ImportState.isImportStopped) {
            saveEstadistica(selectionIndex + 1);
          }
        });
    }
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
  const getButtons = () => {
    const out = [];
    // Si no hay una importación en curso
    if (!isImporting) {
      out.push(
        <Button
          key="import"
          type="primary"
          onClick={doStartImport}
          disabled={!hasSelection}
        >
          {ImportState.isImportStopped ? ' Reanudar' : 'Iniciar'} importación
        </Button>
      );
    }
    // Si hay una importación en curso
    if (isImporting) {
      out.push(
        <Button key="stop" type="primary" onClick={stopImporting} danger>
          Detener importación
        </Button>
      );
    }
    // Si aún no se procesado ninguna estadística
    if (lastProcessedIndex === -1) {
      out.push(
        <Button key="back" onClick={close} disabled={isImporting}>
          Cancelar
        </Button>
      );
    }
    // Si se ha procesado almenos una estadística
    if (lastProcessedIndex > -1) {
      out.push(
        <Button
          key="finalize"
          type="default"
          onClick={finalizeImporting}
          disabled={isImporting}
        >
          Finalizar
        </Button>
      );
    }
    return out;
  };
  return (
    <Modal
      title="Importar estadísticas"
      open={isOpen}
      className="h-screen"
      width={960}
      onCancel={close}
      footer={getButtons()}
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
