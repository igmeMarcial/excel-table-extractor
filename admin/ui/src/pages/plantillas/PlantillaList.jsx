import React, { useState, useEffect, useMemo } from 'react';
import { DeleteRegular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-components';
import Table from '../../components/Table';

const AccionesCell = () => (
  <div className="flex gap-2">
    <Button
      appearance="subtle"
      onClick={() => console.log('diste click a borrar')}
      icon={<DeleteRegular />}
      aria-label="Delete"
    />
  </div>
);

function PlantillaList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch data from the API
    fetch(AesaInfo.apiUrl + '/plantillas')
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'acciones',
        header: 'Acciones',
        size: 100,
        Cell: AccionesCell,
      },
      { accessorKey: 'id', header: 'N°', size: 60 },
      { accessorKey: 'file', header: 'Nombre', size: 260 },
      { accessorKey: 'size', header: 'Tamaño', size: 480 },
      { accessorKey: 'modified', header: 'Fecha de Registro', grow: true },
    ],
    []
  );
  if (loading) {
    return <div>Loading...</div>;
  }

  return <Table columns={columns} db={data && data} />;
}

export default PlantillaList;
