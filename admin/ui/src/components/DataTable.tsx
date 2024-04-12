import { useEffect, useRef, useState } from 'react';
import chroma from 'chroma-js';
import {
  DT_TABLA_DATOS_BORDER_COLOR,
  DT_TABLA_DATOS_BORDER_COLOR_HEADER,
  DT_TABLA_DATOS_FONT_SIZE,
} from '../config/design-tokens';
import { CELL_POSITION_BODY, CELL_POSITION_HEADER, Cell } from '../types/Cell';
import { numberFormat } from '../utils/numberFormat';

interface DataTableProps {
  data: Cell[][];
  color: string;
}

function renderCell(
  cell: Cell,
  rowIndex: number,
  colIndex: number,
  color: string,
  indexCount
) {
  const { v: value, t: type, p: position } = cell || {};

  let cellStyle = {
    backgroundColor: '#fff',
    color: '#000',
    borderColor: chroma(color).alpha(0.7).css() || DT_TABLA_DATOS_BORDER_COLOR,
    verticalAlign: '',
    fontWeight: 'normal',
  };
  if (indexCount % 2 != 0 && position === CELL_POSITION_BODY) {
    cellStyle.backgroundColor = chroma(color).alpha(0.2).css() || '#fff';
  }

  if (position === CELL_POSITION_HEADER) {
    cellStyle.backgroundColor = color || DT_TABLA_DATOS_BORDER_COLOR;
    cellStyle.color = '#fff';
    cellStyle.borderColor = color || DT_TABLA_DATOS_BORDER_COLOR_HEADER;
    cellStyle.fontWeight = 'bold';
  }
  const className =
    type === 'n' && position === CELL_POSITION_BODY
      ? 'text-end whitespace-nowrap' // Aliniación a la derecha para números
      : 'text-start whitespace-nowrap';
  const formattedValue =
    type === 'n' && position === 'b' ? numberFormat(value as number) : value;
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
const renderDataTableRows = (itemRow: Cell[], rowIndex, color: string) => {
  return (
    <tr key={`C${itemRow}-F${rowIndex}`}>
      {itemRow.map((cell, colIndex) =>
        renderCell(cell, 0, colIndex, color, rowIndex)
      )}
    </tr>
  );
};

const DataTable = ({ data, color }: DataTableProps) => {
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
        borderColor:
          chroma(color).alpha(0.7).css() || DT_TABLA_DATOS_BORDER_COLOR,
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
            renderDataTableRows(itemRow, rowIndex, color)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
