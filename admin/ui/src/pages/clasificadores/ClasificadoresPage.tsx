import { useRef, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { Button } from '@fluentui/react-components';
import { Table, TableProps, Tooltip } from 'antd';
import { EditFilled } from '@fluentui/react-icons';

import RowDeteteButton from '../../components/RowDeleteButton';
import ClasificadorEditorModal from './ClasificadorEditorModal';
import MarcoOrdenadorSelect from './MarcoOrdenadorSelect';
import { useGetClasificadoresByMarcoOrdenadorIdQuery } from '../../app/services/marco-ordenador';

interface Clasificador {
  id: number;
  nivel: number;
  numeral: string;
  nombre: string;
}
const ClasificadoresPage = () => {
  const [marcoOrdenador, setMarcoOrdenador] = useState<number>(-1);
  const modalWindowRef = useRef(null);
  const { data: clasificadores, isFetching } =
    useGetClasificadoresByMarcoOrdenadorIdQuery(marcoOrdenador, {
      skip: marcoOrdenador === -1,
    });

  const handleEdit = async (record: Clasificador) => {
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
      width: 100,
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
        <MarcoOrdenadorSelect onChange={setMarcoOrdenador} />
      </div>
      <div>
        <Table
          className="mx-10"
          dataSource={clasificadores}
          columns={columns}
          loading={isFetching}
          size="small"
          pagination={false}
          bordered
          rowKey={(record) => record.id}
          scroll={{ y: 460 }}
        />
      </div>
      <ClasificadorEditorModal ref={modalWindowRef} />
    </MainLayout>
  );
};

export default ClasificadoresPage;
