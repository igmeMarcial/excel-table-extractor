import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import { helpHttp } from '../../helpers/helpHttp';

const AccionesCell = () => (
  <Box sx={{ display: 'flex', gap: '1rem' }}>
    <Tooltip title="Editar">
      <IconButton
        color="primary"
        onClick={() => console.log('disteclick a editar')}
      >
        <LaunchOutlinedIcon sx={{ color: '#424242' }} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Eliminar">
      <IconButton
        color="primary"
        onClick={() => console.log('diste click a borrar')}
      >
        <DeleteOutlinedIcon sx={{ color: '#424242' }} />
      </IconButton>
    </Tooltip>
    {/* Otros iconos de acción si es necesario */}
  </Box>
);

function IndicadorList() {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();
  let url = 'http://localhost:8089/indicadores';

  //Get api
  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setDb(res);
          setError(null);
        } else {
          setDb(null);
          setError(res);
        }
        setLoading(false);
      });
  }, [url]);

  const columns = useMemo(
    () => [
      //column definitions...
      {
        accessorKey: 'acciones', //this column gets pinned to the right by default because of the initial state,
        header: 'Acciones',
        size: 150,
        Cell: AccionesCell,
      },
      {
        accessorKey: 'idComponente', //this column gets pinned left by default because of the the initial state,
        header: 'N°',
        size: 60,
      },

      {
        accessorKey: 'componenteNombre', //this column gets pinned left by default because of the the initial state,
        header: 'Componente',
        size: 260,
      },
      {
        accessorKey: 'nombre', //this column gets pinned left by default because of the the initial state,
        header: 'Indicador',
        size: 480,
      },
      {
        accessorKey: 'ultimaActualizacion',
        header: 'Ultima actualización',
        size: 220,
      },
      {
        accessorKey: 'estado',
        header: 'Estado',
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: db ?? [],
    enableTopToolbar: false,
    enableColumnActions: false,
    enableStickyHeader: true,
    enableColumnPinning: true,
    enableSorting: false,
    layoutMode: 'grid-no-grow', //constant column widths
    muiTableContainerProps: { sx: { maxHeight: '460px' } },
    initialState: {
      columnPinning: { left: ['idComponente'], right: ['acciones'] },
    },
    muiTableProps: {
      sx: {
        backgroundColor: 'white',
      },
    },
    muiTableHeadCellProps: {
      sx: {
        borderBottom: '1px solid #C3C4C7',
        borderLeft: '1px solid #C3C4C7',
        borderTop: '1px solid #C3C4C7',
        fontWeight: '500',
        color: 'black',
        paddingY: '8px',
      },
    },
    muiTableBodyCellProps: {
      sx: {
        bgcolor: 'white',
        paddingY: '0.5em',
        paddingX: '1rem',
      },
    },
  });

  return <MaterialReactTable table={table} />;
}

export default IndicadorList;
