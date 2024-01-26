import React from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

function Table({ columns, db }) {
  // console.log(db);
  const table = useMaterialReactTable({
    columns,
    data: db ?? [],
    enableTopToolbar: false,
    enableColumnActions: false,
    enableStickyHeader: true,
    enableColumnPinning: true,
    enableSorting: false,
    layoutMode: 'grid', //constant column widths
    muiTableContainerProps: { sx: { maxHeight: '460px' } },
    initialState: {
      columnPinning: { left: ['id'], right: ['acciones'] },
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

export default Table;
