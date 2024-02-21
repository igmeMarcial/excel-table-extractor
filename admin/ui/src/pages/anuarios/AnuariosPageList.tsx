import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Table, Modal } from 'antd';
import type { TableProps } from 'antd';

import { FilePdfOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import RowDeteteButton from '../../components/RowDeleteButton';
import RowDownloadButton from '../../components/RowDownloadButton';
import AnuarioRestService from '../../services/AnuarioRestService';
import filesizehuman from '../../utils/filesizehuman';
import formatTimestamp from '../../utils/formatTimestamp';

interface ColDataType {
  key: string;
  name: string;
}
interface AnuariosPageListProps {
  // Add any additional props here
}

const AnuariosPageList = forwardRef((props: AnuariosPageListProps, ref) => {
  const [fullData, setFullData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, contextHolder] = Modal.useModal();

  // Metodo para filtrar la tabla desde el toolbar
  const filterRecords = (text: string) => {
    const filteredData = fullData.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
    setData(filteredData);
  };

  // Agregar registro a la tabla
  const addRecord = (record: any) => {
    setData([record, ...data]);
  };

  // Actualizar lista
  const refresh = () => {
    AnuarioRestService.list()
      .then((data) => {
        setData(data);
        setFullData(data);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Expose the custom method to the parent component
  useImperativeHandle(ref, () => ({
    filterRecords,
    addRecord,
    refresh,
  }));

  useEffect(() => {
    // Obtener lista de plantillas
    AnuarioRestService.list()
      .then((data) => {
        setData(data);
        setFullData(data);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // HANDLERS
  // Handle eliminar
  const handleDelete = (record: any) => {
    modal.confirm({
      title: 'Confirmar eliminación',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          ¿Está seguro que desea eliminar esta plantilla?
          <br />
          <b>{record.name}</b>
        </div>
      ),
      okText: 'Si, eliminar',
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        handleConfirmarEliminacion(record);
      },
    });
  };

  // Handle confirmar eliminacion
  const handleConfirmarEliminacion = (record: any) => {
    AnuarioRestService.delete(record.hash).then(() => {
      setData(data.filter((item) => item.hash !== record.hash));
    });
  };

  const renderFilename = (_, record: any) => (
    <div className="flex">
      <FilePdfOutlined style={{ color: '#F44336', fontSize: '16px' }} />
      <span className="ml-1">{record.name}</span>
    </div>
  );

  const renderActions = (_, record: any) => (
    <div className="flex">
      <a
        href={AnuarioRestService.getDownloadUrl(record.hash)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <RowDownloadButton></RowDownloadButton>
      </a>
      <RowDeteteButton onClick={() => handleDelete(record)} />
    </div>
  );

  const renderModified = (value: number, record: any) => {
    return formatTimestamp(value * 1000);
  };

  const columns: TableProps<ColDataType>['columns'] = [
    {
      key: 'number',
      title: 'N°',
      width: 36,
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      key: 'name',
      title: 'Nombre',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render: renderFilename,
    },
    {
      key: 'size',
      title: 'Tamaño',
      width: 100,
      align: 'right',
      dataIndex: 'size',
      render: filesizehuman,
      sorter: (a: any, b: any) => a.size - b.size,
    },
    {
      key: 'modified',
      title: 'Fecha de registro',
      width: 160,
      align: 'right',
      dataIndex: 'modified',
      render: renderModified,
      sorter: (a: any, b: any) => a.modified - b.modified,
    },
    {
      key: 'actions',
      title: 'Acciones',
      width: 80,
      align: 'right',
      render: renderActions,
    },
  ];

  return (
    <>
      <Table
        className="mx-10"
        dataSource={data}
        columns={columns}
        loading={loading}
        size="small"
        bordered
        rowKey={(record) => record.hash}
      />
      {contextHolder}
    </>
  );
});

export default AnuariosPageList;
