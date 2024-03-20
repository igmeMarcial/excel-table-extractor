import { useEffect, useRef, useState } from 'react';
import {
  DT_TABLA_DATOS_BORDER_COLOR,
  DT_TABLA_DATOS_BORDER_COLOR_HEADER,
  DT_TABLA_DATOS_FONT_SIZE,
} from '../config/design-tokens';
import {
  CELL_POSITION_BODY,
  CELL_POSITION_HEADER,
  DataCell,
} from '../types/DataCell';

interface DataTableProps {
  data: DataCell[][];
}

function renderCell(cell: DataCell, rowIndex: number, colIndex: number) {
  const { v: value, t: type, p: position } = cell || {};

  let cellStyle = {
    backgroundColor: '#fff',
    color: '#000',
    borderColor: DT_TABLA_DATOS_BORDER_COLOR,
    verticalAlign: '',
  };
  if (position === CELL_POSITION_HEADER) {
    cellStyle.backgroundColor = DT_TABLA_DATOS_BORDER_COLOR;
    cellStyle.color = '#fff';
    cellStyle.borderColor = DT_TABLA_DATOS_BORDER_COLOR_HEADER;
  }
  const className =
    type === 'n' && position === CELL_POSITION_BODY
      ? 'text-end whitespace-nowrap' // Aliniación a la derecha para números
      : 'text-start whitespace-nowrap';
  const formattedValue =
    type === 'n' && position === 'b'
      ? value
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
          .replace('.', ',')
      : value;
  return (
    <td
      style={{
        fontSize: DT_TABLA_DATOS_FONT_SIZE,
        border: 'solid 1px',
        borderColor: DT_TABLA_DATOS_BORDER_COLOR,
        fontWeight: '400',
        padding: '4px 6px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1,
        ...cellStyle,
      }}
      key={colIndex}
      colSpan={cell.s}
      rowSpan={cell.rs}
      className={className}
    >
      {formattedValue}
    </td>
  );
}
const renderDataTableRows = (itemRow: DataCell[], rowIndex) => {
  return (
    <tr key={`C${itemRow}-F${rowIndex}`}>
      {itemRow.map((cell, colIndex) => renderCell(cell, 0, colIndex))}
    </tr>
  );
};

const DataTable = ({ data }: DataTableProps) => {
  console.log(data);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const tableWrapperRef = useRef(null);
  // Actualiza el estado hasScrollbar si hay scroll horizontal
  const checkScrollbar = () => {
    const div = tableWrapperRef.current;
    if (div) {
      const hasVerticalScrollbar = div.scrollWidth > div.clientWidth;
      setHasScrollbar(hasVerticalScrollbar);
    }
  };
  // Detecta si hay scroll horizontal al cargar el componente
  useEffect(() => {
    window.addEventListener('resize', checkScrollbar);
    checkScrollbar();
    return () => {
      window.removeEventListener('resize', checkScrollbar);
    };
  }, []);
  // Detecta si hay scroll horizontal al cambiar la data
  useEffect(() => {
    checkScrollbar();
  }, [data]);
  return (
    <div
      className="overflow-auto"
      style={{
        borderWidth: hasScrollbar ? '1px' : '0',
        borderStyle: hasScrollbar ? 'solid' : 'none',
        borderColor: DT_TABLA_DATOS_BORDER_COLOR,
      }}
      ref={tableWrapperRef}
    >
      <table
        id="DataTableEstadistica"
        style={{
          borderCollapse: 'collapse',
          borderSpacing: '0',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <tbody>
          {data.map((itemRow, rowIndex) =>
            renderDataTableRows(itemRow, rowIndex)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
