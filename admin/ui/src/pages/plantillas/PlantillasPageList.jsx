import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Table, Modal } from 'antd';
import { FileWordOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import RowDeteteButton from '../../components/RowDeleteButton';
import RowDownloadButton from '../../components/RowDownloadButton';
import PlantillaRestService from '../../services/PlantillaRestService';
import filesizehuman from '../../utils/filesizehuman';
import formatTimestamp from '../../utils/formatTimestamp';

const PlantillasPageList = forwardRef((props, ref) => {
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, contextHolder] = Modal.useModal();
  // Metodo para filtrar la tabla desde el toolbar
  const filterRecords = (text) => {
    const filteredData = fullData.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
    setData(filteredData);
  };
  // Agregar registro a la tabla
  const addRecord = (record) => {
    setData([record, ...data]);
  };
  // Expose the custom method to the parent component
  useImperativeHandle(ref, () => ({
    filterRecords,
    addRecord,
  }));

  useEffect(() => {
    // Obtener lista de plantillas
    PlantillaRestService.list()
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
  const handleDelete = (record) => {
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
  const handleConfirmarEliminacion = (record) => {
    PlantillaRestService.delete(record.hash).then(() => {
      setData(data.filter((item) => item.hash !== record.hash));
    });
  };
  const renderFilename = (_, record) => (
    <div className="flex">
      <FileWordOutlined style={{ color: '#185ABD', fontSize: '16px' }} />
      <span className="ml-1">{record.name}</span>
    </div>
  );

  const renderActions = (_, record) => (
    <div className="flex">
      <RowDownloadButton></RowDownloadButton>
      <RowDeteteButton onClick={() => handleDelete(record)} />
    </div>
  );

  const renderModified = (value, record) => {
    return formatTimestamp(value * 1000);
  };

  const columns = [
    {
      key: 'number',
      title: 'N°',
      width: 36,
      render: (_, record, index) => index + 1,
    },
    {
      key: 'name',
      title: 'Nombre',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: renderFilename,
    },
    {
      key: 'size',
      title: 'Tamaño',
      width: 100,
      align: 'right',
      dataIndex: 'size',
      render: filesizehuman,
      sorter: (a, b) => a.size - b.size,
    },
    {
      key: 'modified',
      title: 'Fecha de registro',
      width: 160,
      align: 'right',
      dataIndex: 'modified',
      render: renderModified,
      sorter: (a, b) => a.modified - b.modified,
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

export default PlantillasPageList;
