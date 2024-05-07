import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Table, TableProps, Tooltip } from 'antd';
import { Button } from '@fluentui/react-components';
import {
  OpenRegular,
  CheckmarkCircleRegular,
  CheckmarkCircleWarningRegular,
} from '@fluentui/react-icons';
import dayjs from 'dayjs';

import { builNavPathUrl } from '../../utils/url-utils';
import RowDeteteButton from '../../components/RowDeleteButton';
import EstadisticaService from '../../services/EstadisticaService';
import { useAppDispatch } from '../../app/hooks';
import { setActiveTab } from './EstadisticaFormSlice';
interface ColDataType {
  key: string;
  name: string;
  modified: number;
}

const EstadisticasPageList = forwardRef((props, ref) => {
  const location = useLocation();
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispath = useAppDispatch();
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
  // Expose the custom method to tthe parent component
  useImperativeHandle(ref, () => ({
    filterRecords,
    addRecord,
  }));

  useEffect(() => {
    // Obtener lista de plantillas
    EstadisticaService.list()
      .then((data) => {
        setData(data);
        setFullData(data);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderFechaMod = (value, record) => {
    return dayjs(value).format('DD/MM/YYYY hh:mm A');
  };

  const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    dispath(setActiveTab('1'));
  };
  const renderChecks = (_, record) => {
    console.log(record);
    return (
      <div>
        {record.activo ? (
          <CheckmarkCircleRegular /> // Si activo es verdadero
        ) : (
          <CheckmarkCircleWarningRegular /> // Si activo es falso
        )}
      </div>
    );
  };
  const renderArchivedChecks = (_, record) => {
    return (
      <div>
        {record.archivado ? (
          <CheckmarkCircleRegular /> // Si archivado es verdadero
        ) : (
          <CheckmarkCircleWarningRegular /> // Si archivado es falso
        )}
      </div>
    );
  };
  const renderActions = (_, record) => {
    const newUrl = builNavPathUrl(location, 'indicador-editor', record.id);
    return (
      <div className="flex">
        <Link to={newUrl} onClick={onClickLink}>
          <Tooltip title="Ir al indicador">
            <Button appearance="subtle" icon={<OpenRegular />} />
          </Tooltip>
        </Link>
        <RowDeteteButton onClick={() => handleDelete(record)} />
      </div>
    );
  };
  const handleDelete = (record: any) => {
    // TODO: Implementar
  };
  // Columnas de la tabla
  const columns: TableProps<ColDataType>['columns'] = [
    {
      key: 'number',
      title: 'N°',
      fixed: 'left',
      width: 36,
      // width: '4%',
      render: (_, record, index) => index + 1,
    },
    {
      key: 'mdeaComponenteNombre',
      title: 'Componente',
      width: 240,
      // width: '19%',
      dataIndex: 'mdeaComponenteNombre',
    },
    {
      key: 'nombre',
      title: 'Indicador',
      dataIndex: 'nombre',

      // width: '47%',
    },
    {
      key: 'fechaMod',
      title: 'Última modificación',
      width: 170,
      // width: '14%',
      align: 'right',
      dataIndex: 'fechaMod',
      render: renderFechaMod,
      sorter: (a, b) => a.modified - b.modified,
    },
    {
      key: 'status',
      align: 'center',
      width: 70,
      // width: '8%',
      title: 'Activo',
      dataIndex: 'status',
      render: renderChecks,
    },
    {
      key: 'archivado',
      align: 'center',
      width: 85,
      // width: '8%',
      title: 'Archivado',
      dataIndex: 'status',
      render: renderArchivedChecks,
    },
    {
      key: 'actions',
      title: 'Acciones',
      width: 80,
      // width: '8%',
      align: 'right',
      fixed: 'right',
      render: renderActions,
    },
  ];
  return (
    <Table
      className="mx-10"
      dataSource={data}
      columns={columns}
      loading={loading}
      size="small"
      bordered
      rowKey={(record) => record.id}
      scroll={{ y: 380 }}
    />
  );
});

export default EstadisticasPageList;
