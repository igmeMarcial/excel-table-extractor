import { useEffect, useRef, useState } from 'react';
import { CellRange } from '../types/CellRange';
import {
  CELL_POSITION_BODY,
  CELL_VALUE_TYPE_NUMBER,
  Cell,
} from '../types/Cell';
import { getMaxRowLength } from '../utils/array-utils';
import { numberFormat } from '../utils/numberFormat';

import './Datasheet.scss';
/**
 * Tipos de rango
 * v: valores
 * c: categorias
 * s: series
 * d: datos
 */
type RangeType = 'v' | 'c' | 's' | 'd';

export interface ChartDataRanges {
  valuesRange: CellRange;
  categoriesRange: CellRange;
  seriesRange: CellRange;
}

interface DatasheetProps {
  data: Cell[][];
  dataSelectionRange?: CellRange;
  chartDataRanges?: ChartDataRanges;
}

function renderCell(
  cell: Cell,
  dataSelectionRange: CellRange,
  chartDataRanges: ChartDataRanges
) {
  const { v: value, t: type, p: position } = cell;
  const formattedValue =
    type === 'n' && position === 'b' ? numberFormat(value as number) : value;
  return (
    <td
      key={cell.c}
      colSpan={cell.s}
      rowSpan={cell.rs}
      className={getCellCls(cell, dataSelectionRange, chartDataRanges)}
    >
      {formattedValue}
    </td>
  );
}

const getCellCls = (
  cell: Cell,
  dataSelectionRange: CellRange,
  chartDataRanges?: ChartDataRanges
) => {
  const { t: type, p: position } = cell;
  const clsStack = [];
  if (type === CELL_VALUE_TYPE_NUMBER && position === CELL_POSITION_BODY) {
    clsStack.push('data-cell--number');
  }
  // Selected
  let bordersCls = getCellBorderCls(cell, dataSelectionRange, chartDataRanges);
  if (bordersCls) {
    clsStack.push(bordersCls);
  }
  const rangeCls = getCellBackgroundCls(
    cell,
    dataSelectionRange,
    chartDataRanges
  );
  if (rangeCls) {
    clsStack.push(rangeCls);
  }
  return clsStack.join(' ');
};
// Devuelve las clases de borde de la celda
const getCellBorderCls = (
  cell: Cell,
  dataSelectionRange: CellRange,
  chartDataRanges: ChartDataRanges
) => {
  const outStack = [];
  if (dataSelectionRange) {
    outStack.push(getRangeBorderCls(cell, dataSelectionRange, 'd'));
  }
  if (chartDataRanges) {
    const { valuesRange, categoriesRange, seriesRange } = chartDataRanges;
    outStack.push(
      getRangeBorderCls(cell, valuesRange, 'v'),
      getRangeBorderCls(cell, categoriesRange, 'c'),
      getRangeBorderCls(cell, seriesRange, 's')
    );
  }
  return outStack.join(' ');
};
const getCellBackgroundCls = (
  cell: Cell,
  dataSelectionRange: CellRange,
  chartDataRanges: ChartDataRanges
) => {
  const outStack = [];
  if (dataSelectionRange) {
    outStack.push(getRangeBackgroudCls(cell, dataSelectionRange, 'd'));
  }
  if (chartDataRanges) {
    const { valuesRange, categoriesRange, seriesRange } = chartDataRanges;
    outStack.push(
      getRangeBackgroudCls(cell, valuesRange, 'v'),
      getRangeBackgroudCls(cell, categoriesRange, 'c'),
      getRangeBackgroudCls(cell, seriesRange, 's')
    );
  }
  return outStack.join(' ');
};
const getRangeBorderCls = (
  cell: Cell,
  range: CellRange,
  rangeType: RangeType
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

const getRangeBackgroudCls = (
  cell: Cell,
  range: CellRange,
  rangeType: RangeType
) => {
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

const renderRow = (
  rowData: Cell[],
  rowIndex: number,
  dataSelectionRange: CellRange,
  chartDataRanges: ChartDataRanges
) => {
  return (
    <tr key={rowIndex}>
      <td className="row-reference">{rowIndex + 1}</td>
      {rowData.map((cell) =>
        renderCell(cell, dataSelectionRange, chartDataRanges)
      )}
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

const Datasheet = ({
  data,
  chartDataRanges,
  dataSelectionRange,
}: DatasheetProps) => {
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
          <ColLabels colsNumber={maxColIndex + 1} />
          {data.map((row, rowIndex) =>
            renderRow(row, rowIndex, dataSelectionRange, chartDataRanges)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Datasheet;
