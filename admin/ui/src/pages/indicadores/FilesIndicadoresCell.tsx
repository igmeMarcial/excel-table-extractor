import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Indicador',
    dataIndex: 'file',
  },
];
interface FileIndicadoresCellProps {
  arr: [];
}

const FilesIndicadoresCell: React.FC<FileIndicadoresCellProps> = ({ arr }) => {
  return (
    <div className=" ">
      <Table
        dataSource={arr}
        columns={columns}
        // loading={loading}
        pagination={false}
        size="small"
        bordered
        scroll={{
          y: 300,
        }}
      />
    </div>
  );
};

export default FilesIndicadoresCell;
