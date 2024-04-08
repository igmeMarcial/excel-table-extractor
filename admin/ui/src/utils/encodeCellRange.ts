import * as XLSX from 'xlsx'
import { CellRange } from '../types/CellRange'
export const encodeCellRange = (range: CellRange): string => {
  return XLSX.utils.encode_range({
    s: {
      c: range.start.colIndex,
      r: range.start.rowIndex,
    },
    e: {
      c: range.end.colIndex,
      r: range.end.rowIndex,
    }
  });
}
