import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Table, TableProps, Tooltip } from 'antd';
import { Button } from '@fluentui/react-components';
import {
  CheckmarkCircleFilled,
  CircleRegular,
  EditFilled,
  EarthFilled,
} from '@fluentui/react-icons';
import dayjs from 'dayjs';

import { builNavPathUrl } from '../../utils/url-utils';
import RowDeteteButton from '../../components/RowDeleteButton';
import EstadisticaService from '../../services/EstadisticaService';
import { useAppDispatch } from '../../app/hooks';
import { setActiveTab } from './EstadisticaFormSlice';
import { getEstadisticaPublicUrl } from '../../utils/estadistica-utils';
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
    const filteredData = fullData.filter((model) => {
      // Convert text to lower case for case-insensitive comparison
      const lowerText = text.toLowerCase();

      // Extract all string values from the model
      const values = Object.values(model).filter(
        (value) => typeof value === 'string'
      ) as string[];
      // Check if any of the values include the search text
      return values.some((value) => value.toLowerCase().includes(lowerText));
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
    return (
      <div>
        {record.activo ? (
          <CheckmarkCircleFilled /> // Si activo es verdadero
        ) : (
          <CircleRegular /> // Si activo es falso
        )}
      </div>
    );
  };
  const renderArchivedChecks = (_, record) => {
    return (
      <div>
        {record.archivado ? (
          <CheckmarkCircleFilled /> // Si archivado es verdadero
        ) : (
          <CircleRegular /> // Si archivado es falso
        )}
      </div>
    );
  };
  const renderActions = (_, record) => {
    const newUrl = builNavPathUrl(location, 'indicador-editor', record.id);
    return (
      <div className="flex">
        <Link to={getEstadisticaPublicUrl(record.id)} target="_blank">
          <Tooltip title="Ir a vista pública">
            <Button appearance="subtle" icon={<EarthFilled />}></Button>
          </Tooltip>
        </Link>
        <Link to={newUrl} onClick={onClickLink}>
          <Tooltip title="Editar">
            <Button appearance="subtle" icon={<EditFilled />} />
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
      render: (_, record, index) => index + 1,
    },
    {
      key: 'mdeaComponenteNombre',
      title: 'Componente',
      width: 240,
      dataIndex: 'mdeaComponenteNombre',
    },
    {
      key: 'nombre',
      title: 'Estadística',
      dataIndex: 'nombre',
      width: 360,
    },
    {
      key: 'unidadMedida',
      title: 'Unidad de medida',
      dataIndex: 'unidadMedida',
      width: 260,
    },
    {
      key: 'periodoSerieTiempo',
      title: 'Período de serie de tiempo',
      dataIndex: 'periodoSerieTiempo',
      width: 220,
    },
    {
      key: 'clasificacionMdea',
      title: 'MDEA',
      dataIndex: 'clasificacionMdea',
      width: 60,
    },
    {
      key: 'clasificacionOds',
      title: 'ODS',
      dataIndex: 'clasificacionOds',
      width: 60,
    },
    {
      key: 'clasificacionOcde',
      title: 'OCDE',
      dataIndex: 'clasificacionOcde',
      width: 60,
    },
    {
      key: 'clasificacionPna',
      title: 'PNA',
      dataIndex: 'clasificacionPna',
      width: 100,
    },
    {
      key: 'fechaMod',
      title: 'Última modificación',
      width: 170,
      align: 'right',
      dataIndex: 'fechaMod',
      render: renderFechaMod,
      sorter: (a, b) => a.modified - b.modified,
    },
    {
      key: 'status',
      align: 'center',
      width: 70,
      title: 'Activo',
      dataIndex: 'status',
      render: renderChecks,
    },
    {
      key: 'archivado',
      align: 'center',
      width: 85,
      title: 'Archivado',
      dataIndex: 'status',
      render: renderArchivedChecks,
    },
    {
      key: 'actions',
      title: 'Acciones',
      width: 120,
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
      pagination={{
        pageSize: 500,
      }}
      bordered
      rowKey={(record) => record.id}
      scroll={{ y: 460 }}
    />
  );
});

export default EstadisticasPageList;
