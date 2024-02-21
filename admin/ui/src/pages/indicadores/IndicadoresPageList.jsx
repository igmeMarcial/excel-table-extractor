import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Table } from "antd";
import * as dayjs from "dayjs";
import RowDeteteButton from "../../components/RowDeleteButton";
import { Button } from "@fluentui/react-components";
import { OpenRegular } from "@fluentui/react-icons";
import EstadisticaService from "../../services/EstadisticaService";

const IndicadoresPageList = forwardRef((props, ref) => {
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
    return dayjs(value).format("DD/MM/YYYY hh:mm A");
  };

  const renderActions = (_, record) => (
    <div className="flex">
      <Button appearance="subtle" icon={<OpenRegular />} aria-label="Edit" />
      <RowDeteteButton />
    </div>
  );

  // Columnas de la tabla
  const columns = [
    {
      key: "number",
      title: "N°",
      fixed: "left",
      width: 36,
      // width: '4%',
      render: (_, record, index) => index + 1,
    },
    {
      key: "mdeaComponenteNombre",
      title: "Componente",
      width: 240,
      // width: '19%',
      dataIndex: "mdeaComponenteNombre",
    },
    {
      key: "nombre",
      title: "Indicador",
      dataIndex: "nombre",

      // width: '47%',
    },
    {
      key: "fechaMod",
      title: "Última modificación",
      width: 180,
      // width: '14%',
      align: "right",
      dataIndex: "fechaMod",
      render: renderFechaMod,
      sorter: (a, b) => a.modified - b.modified,
    },
    {
      key: "status",
      align: "center",
      width: 100,
      // width: '8%',
      title: "Estado",
      dataIndex: "status",
    },
    {
      key: "actions",
      title: "Acciones",
      width: 80,
      // width: '8%',
      align: "right",
      fixed: "right",
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
        rowKey={(record) => record.id}
        scroll={{ y: 380 }}
      />
    </>
  );
});

export default IndicadoresPageList;
