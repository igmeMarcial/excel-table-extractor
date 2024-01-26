import React, { useMemo } from 'react';
import Table from '../../components/Table';
import { itemsTestAnuarios } from '../../utils/data';
import { Button } from '@fluentui/react-components';
import { DeleteRegular } from '@fluentui/react-icons';

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

function AnuariosList() {
  const columns = useMemo(
    () => [
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
        accessorKey: 'nombre', //this column gets pinned left by default because of the the initial state,
        header: 'Nombre',
        size: 260,
      },
      {
        accessorKey: 'tamanio', //this column gets pinned left by default because of the the initial state,
        header: 'Tamaño',
        size: 480,
      },
      {
        accessorKey: 'fechaRegistro',
        header: 'Fecha de Registro',
        grow: true,
        //large column
      },
    ],
    []
  );

  return <Table columns={columns} db={itemsTestAnuarios} />;
}

export default AnuariosList;
