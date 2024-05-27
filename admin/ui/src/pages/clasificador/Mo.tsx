import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { Select, useId, Button } from '@fluentui/react-components';
import { Table, TableProps, Tooltip } from 'antd';
import {
  CheckmarkCircleFilled,
  CircleRegular,
  EditFilled,
  EarthFilled,
} from '@fluentui/react-icons';
import ClasificadorService from '../../services/ClasificadorService';
import { CodigoMarcoOrdenador } from '../../types/CodigoMarcoOrdenador';
import {
  useGetIndiceClasificadoresAllQuery,
  useGetIndiceClasificadoresQuery,
} from '../../app/services/clasificador';
import { builNavPathUrl } from '../../utils/url-utils';
import { Link, useLocation } from 'react-router-dom';
import { getEstadisticaPublicUrl } from '../../utils/estadistica-utils';
import RowDeteteButton from '../../components/RowDeleteButton';

interface Clasificador {
  id: number;
  nivel: number;
  numeral: string;
  nombre: string;
}
export const Mo = () => {
  const selectId = useId();
  const location = useLocation();
  const [marcoOrdenador, setMarcoOrdenador] = useState<string>('mdea');
  const {
    data: clasificadores,
    refetch,
    isLoading,
  } = useGetIndiceClasificadoresAllQuery(marcoOrdenador);

  useEffect(() => {
    refetch();
  }, [marcoOrdenador]);

  const renderActions = (_, record) => {
    const newUrl = builNavPathUrl(location, 'indicador-editor', record.id);
    return (
      <div className="flex">
        <Link to={newUrl}>
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

  const columns: TableProps<Clasificador>['columns'] = [
    {
      key: 'number',
      title: 'N°',
      fixed: 'left',
      width: 50,
      dataIndex: 'id',
    },
    {
      key: 'nivel',
      title: 'Nivel',
      width: 140,
      dataIndex: 'nivel',
    },
    {
      key: 'numeral',
      title: 'Numeral',
      dataIndex: 'numeral',
      width: 160,
    },
    {
      key: 'nombre',
      title: 'Nombre',
      dataIndex: 'nombre',
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
    <MainLayout>
      <div className="w-[300px] my-6 px-[2.5rem]">
        <label htmlFor={selectId}>Marco Ordenador</label>
        <Select
          defaultValue="Mdea"
          id={selectId}
          onChange={(e) => setMarcoOrdenador(e.target.value)}
        >
          <option value="mdea">Mdea</option>
          <option value="pna">Pna</option>
          <option value="ods">Ods</option>
          <option value="ocde">Ocde</option>
        </Select>
      </div>
      <div>
        <Table
          className="mx-10"
          dataSource={clasificadores}
          columns={columns}
          loading={isLoading}
          size="small"
          pagination={{
            pageSize: 500,
          }}
          bordered
          rowKey={(record) => record.id}
          scroll={{ y: 460 }}
        />
      </div>
    </MainLayout>
  );
};
