import { useRef, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { Button } from '@fluentui/react-components';
import { Modal, Table, TableProps, Tooltip, Empty } from 'antd';
import { EditRegular, Add24Filled } from '@fluentui/react-icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import RowDeteteButton from '../../components/RowDeleteButton';
import ClasificadorEditorModal from './ClasificadorEditorModal';
import MarcoOrdenadorSelect from './MarcoOrdenadorSelect';
import { useGetClasificadoresByMarcoOrdenadorIdQuery } from '../../app/services/marco-ordenador';
import { useDeleteClasificadorMutation } from '../../app/services/clasificador';

interface Clasificador {
  id: number;
  nivel: number;
  numeral: string;
  nombre: string;
}

const ClasificadoresPage = () => {
  const [marcoOrdenador, setMarcoOrdenador] = useState<number>(-1);
  const [modal, contextHolder] = Modal.useModal();
  const modalWindowRef = useRef(null);
  const { data: clasificadores, isFetching } =
    useGetClasificadoresByMarcoOrdenadorIdQuery(marcoOrdenador, {
      skip: marcoOrdenador === -1,
    });
  const [deleteClasificador, { isLoading: isDeleting }] =
    useDeleteClasificadorMutation();
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
            icon={<EditRegular />}
          />
        </Tooltip>

        <RowDeteteButton onClick={() => handleDelete(record)} />
      </div>
    );
  };
  const handleDelete = (record: any) => {
    console.log('click en delete');
    modal.confirm({
      title: 'Confirmar eliminación',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          ¿Está seguro que desea eliminar esta clasificador {record.id}?
          <br />
          <b>{record.name}</b>
        </div>
      ),
      okText: 'Si, eliminar',
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        handleConfirmDelete(record);
      },
    });
  };
  const handleConfirmDelete = async (record: any) => {
    if (record.id) {
      try {
        await deleteClasificador(record.id);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleRegister = () => {
    modalWindowRef.current?.open({});
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
      width: 50,
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
      <div className="flex px-10 pt-4 pb-6 gap-2 justify-between items-end">
        <MarcoOrdenadorSelect onChange={setMarcoOrdenador} />
        <Button
          style={{ color: '#2271B1' }}
          appearance="subtle"
          icon={<Add24Filled />}
          onClick={handleRegister}
        >
          Registrar
        </Button>
      </div>
      <div>
        <Table
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  marcoOrdenador !== -1
                    ? 'No hay datos'
                    : 'Selecciona un Marco Ordenador'
                }
              />
            ),
          }}
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
        {contextHolder}
      </div>
      <ClasificadorEditorModal ref={modalWindowRef} />
    </MainLayout>
  );
};

export default ClasificadoresPage;
