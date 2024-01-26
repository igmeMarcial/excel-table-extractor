import { useEffect, useMemo, useState } from 'react';
import { Button } from '@fluentui/react-components';
import { helpHttp } from '../../helpers/helpHttp';
import { OpenRegular, DeleteRegular } from '@fluentui/react-icons';
import Table from '../../components/Table';

const AccionesCell = () => (
  <div className="flex gap-2">
    <Button
      appearance="subtle"
      onClick={() => console.log('disteclick a editar')}
      icon={<OpenRegular />}
      aria-label="Edit"
    />
    <Button
      appearance="subtle"
      onClick={() => console.log('diste click a borrar')}
      icon={<DeleteRegular />}
      aria-label="Delete"
    />
  </div>
);

function IndicadorList() {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();
  let url = `${AesaInfo.apiUrl}/estadisticas`;

  //Get data from API
  useEffect(() => {
    setLoading(true);
    api.get(url).then((res) => {
      setDb(res.data);
      setLoading(false);
    });
  }, [url]);

  const columns = useMemo(
    () => [
      //column definitions...
      {
        accessorKey: 'acciones', //this column gets pinned to the right by default because of the initial state,
        header: 'Acciones',
        size: 100,
        Cell: AccionesCell,
      },
      {
        accessorKey: 'id', //this column gets pinned left by default because of the the initial state,
        header: 'N°',
        size: 60,
      },

      {
        accessorKey: 'mdeaComponenteNombre', //this column gets pinned left by default because of the the initial state,
        header: 'Componente',
        size: 260,
      },
      {
        accessorKey: 'nombre', //this column gets pinned left by default because of the the initial state,
        header: 'Indicador',
        size: 380,
      },
      {
        accessorKey: 'ultimaActualizacion',
        header: 'Ultima actualización',
        size: 180,
      },
      {
        accessorKey: 'estado',
        header: 'Estado',
        grow: true,
      },
    ],
    []
  );
  if (loading) {
    return <div>Loading...</div>;
  }

  return <Table columns={columns} db={db && db} />;
}

export default IndicadorList;
