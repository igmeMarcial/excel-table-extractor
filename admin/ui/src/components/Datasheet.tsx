import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  DT_TABLA_DATOS_BORDER_COLOR,
  DT_TABLA_DATOS_BORDER_COLOR_HEADER,
} from '../config/design-tokens';
import { CellRange } from '../types/CellRange';
import {
  CELL_POSITION_BODY,
  CELL_POSITION_HEADER,
  CELL_VALUE_TYPE_NUMBER,
  Cell,
} from '../types/Cell';
import { getMaxRowLength } from '../utils/array-utils';
import { decodeCellRange } from '../utils/decodeCellRange';
import { numberFormat } from '../utils/numberFormat';

import './Datasheet.scss';

type RangeType = 'v' | 'c' | 's';

interface DatasheetProps {
  data: Cell[][];
  chartRanges?: {
    valuesRange: CellRange;
    categoriesRange: CellRange;
    seriesRange: CellRange;
  };
}
const rangoSeleccionado = 'C3:G7';
function renderCell(cell: Cell, selection: CellRange) {
  const { v: value, t: type, p: position } = cell;
  const formattedValue =
    type === 'n' && position === 'b' ? numberFormat(value as number) : value;
  return (
    <td
      key={cell.c}
      colSpan={cell.s}
      rowSpan={cell.rs}
      className={getCellCls(cell, selection)}
    >
      {formattedValue}
    </td>
  );
}

const getCellCls = (cell: Cell, selection: CellRange) => {
  const { t: type, p: position } = cell;
  const clsStack = [];
  if (type === CELL_VALUE_TYPE_NUMBER && position === CELL_POSITION_BODY) {
    clsStack.push('data-cell--number');
  }
  // Selected
  let bordersCls = getBordersCls(cell, selection, 's');
  if (bordersCls) {
    clsStack.push(bordersCls);
  }
  const rangeCls = getRangeCls(cell, selection, 's');
  if (rangeCls) {
    clsStack.push(rangeCls);
  }
  return clsStack.join(' ');
};

const getBordersCls = (
  cell: Cell,
  range: CellRange,
  rangeType: 'v' | 'c' | 's'
) => {
  const { r: rowIndex, c: colIndex } = cell;
  // Selected
  const clsStack = [];
  // Top
  if (
    rowIndex === range.start.rowIndex &&
    isBetween(colIndex, range.start.colIndex, range.end.colIndex)
  ) {
    clsStack.push(`${rangeType}rb-t`);
  }
  // Right
  if (
    colIndex === range.end.colIndex &&
    isBetween(rowIndex, range.start.rowIndex, range.end.rowIndex)
  ) {
    clsStack.push(`${rangeType}rb-r`);
  }
  // Bottom
  if (
    rowIndex === range.end.rowIndex &&
    isBetween(colIndex, range.start.colIndex, range.end.colIndex)
  ) {
    clsStack.push(`${rangeType}rb-b`);
  }
  if (
    colIndex === range.start.colIndex &&
    isBetween(rowIndex, range.start.rowIndex, range.end.rowIndex)
  ) {
    clsStack.push(`${rangeType}rb-l`);
  }
  if (clsStack.length > 0) {
    return clsStack.join(' ');
  }
  return null;
};

const getRangeCls = (cell: Cell, range: CellRange, rangeType: RangeType) => {
  if (isCellInside(cell, range)) {
    return `${rangeType}range-part`;
  }
  return null;
};

const isBetween = (x: number, start: number, end: number) => {
  return x >= start && x <= end;
};

const isCellInside = (cell: Cell, range: CellRange) => {
  return (
    isBetween(cell.c, range.start.colIndex, range.end.colIndex) &&
    isBetween(cell.r, range.start.rowIndex, range.end.rowIndex)
  );
};

const renderRow = (rowData: Cell[], rowIndex: number, selection: CellRange) => {
  return (
    <tr key={rowIndex}>
      <td className="row-reference">{rowIndex + 1}</td>
      {rowData.map((cell) => renderCell(cell, selection))}
    </tr>
  );
};
const getColumnLetter = (colIndex: number) => {
  let letter = '';
  while (colIndex >= 0) {
    letter = String.fromCharCode(65 + (colIndex % 26)) + letter;
    colIndex = Math.floor(colIndex / 26) - 1;
  }
  return letter;
};

const ColLabels = ({ colsNumber }: { colsNumber: number }) => {
  const labelsStack = [
    <td key="cx" className="empty-corner">
      X
    </td>,
  ];
  for (let i = 0; i < colsNumber; i++) {
    labelsStack.push(
      <td key={i} className="text-center col-reference">
        {getColumnLetter(i)}
      </td>
    );
  }
  return <tr>{labelsStack}</tr>;
};

const Datasheet = ({ data }: DatasheetProps) => {
  const selection = decodeCellRange(rangoSeleccionado);
  const maxColIndex = getMaxRowLength(data) - 1;
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
  // DataRows
  const dataRowsStack = [];
  let rowCounter = 0;
  data.forEach((itemRow, rowIndex) => {
    rowCounter++;
    dataRowsStack.push(renderRow(itemRow, rowCounter, selection));
  });
  // Datasheet
  return (
    <div
      className="overflow-auto"
      style={{
        borderWidth: hasScrollbar ? '1px' : '0',
        borderStyle: hasScrollbar ? 'solid' : 'none',
        borderColor: '#ABABAB',
      }}
      ref={tableWrapperRef}
    >
      <table className="aesa-datasheet">
        <tbody>
          <ColLabels colsNumber={maxColIndex} />
          {data.map((row, rowIndex) => renderRow(row, rowIndex, selection))}
        </tbody>
      </table>
    </div>
  );
};

export default Datasheet;
