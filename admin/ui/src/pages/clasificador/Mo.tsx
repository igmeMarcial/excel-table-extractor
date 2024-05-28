import React, { useEffect, useRef, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { Select, useId, Button } from '@fluentui/react-components';
import { Table, TableProps, Tooltip } from 'antd';
import { EditFilled } from '@fluentui/react-icons';
import { useGetIndiceClasificadoresAllQuery } from '../../app/services/clasificador';
import { builNavPathUrl } from '../../utils/url-utils';
import { Link, useLocation } from 'react-router-dom';

import RowDeteteButton from '../../components/RowDeleteButton';
import { MarcoOrdenadorModal } from './MarcoOrdenadorModal';

interface Clasificador {
  id: number;
  nivel: number;
  numeral: string;
  nombre: string;
}
export const Mo = () => {
  const selectId = useId();
  const [marcoOrdenador, setMarcoOrdenador] = useState<string>('mdea');
  const modalWindowRef = useRef(null);
  const {
    data: clasificadores,
    refetch,
    isLoading,
  } = useGetIndiceClasificadoresAllQuery(marcoOrdenador);

  useEffect(() => {
    refetch();
  }, [marcoOrdenador]);

  const handleEdit = (record: Clasificador) => {
    modalWindowRef.current?.open({ record });
  };
  const renderActions = (_, record: Clasificador) => {
    return (
      <div className="flex">
        <Tooltip title="Editar">
          <Button
            onClick={() => handleEdit(record)}
            appearance="subtle"
            icon={<EditFilled />}
          />
        </Tooltip>

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
      width: 80,
      dataIndex: 'nivel',
    },
    {
      key: 'numeral',
      title: 'Numeral',
      dataIndex: 'numeral',
      width: 80,
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
      <MarcoOrdenadorModal ref={modalWindowRef} />
    </MainLayout>
  );
};
