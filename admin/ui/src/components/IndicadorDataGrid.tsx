import { DataCell } from '../types/DataCell';
import { FC } from 'react';

interface DataGridTableProps {
  data: DataCell[];
}

function renderCell(cell: DataCell, rowIndex: number, colIndex: number) {
  const { value, type, typeCell } = cell || {};

  let cellStyle = {
    backgroundColor: '#fff',
    color: '#000',
    borderColor: 'rgb(107, 107, 107)',
    verticalAlign: '',
  };
  if (typeCell === 'header') {
    cellStyle.backgroundColor = 'rgb(107, 107, 107)';
    cellStyle.color = '#fff';
    cellStyle.borderColor = 'rgb(143, 143, 143)';
  }
  const className =
    type === 'number' && typeCell === 'body'
      ? 'text-end whitespace-nowrap' // Aliniación a la derecha para números
      : 'text-start whitespace-nowrap';
  const formattedValue =
    type === 'number' && typeCell === 'body'
      ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      : value;
  return (
    <td
      style={{
        fontSize: '12px',
        border: 'rgb(107, 107, 107) solid 1px',
        fontWeight: '400',
        padding: '4px 8px',
        ...cellStyle,
      }}
      key={colIndex}
      colSpan={cell.colSpan}
      rowSpan={cell.rowSpan}
      className={className}
    >
      {formattedValue}
    </td>
  );
}

const IndicadorDataGrid: FC<DataGridTableProps> = ({ data }) => {
  const renderTable = () => {
    return (
      <table
        style={{
          borderCollapse: 'collapse',
          borderSpacing: '0',
          width: '100%',
          border: 'solid rgb(107, 107, 107) 1px',
        }}
      >
        <tbody>
          {data.map((itemRow, rowIndex) => renderTableRows(itemRow, rowIndex))}
        </tbody>
      </table>
    );
  };

  const renderTableRows = (itemRow, rowIndex) => {
    return (
      <tr key={`C${itemRow}-F${rowIndex}`}>
        {itemRow.map((cell, colIndex) => renderCell(cell, 0, colIndex))}
      </tr>
    );
  };

  return renderTable();
};

export default IndicadorDataGrid;
