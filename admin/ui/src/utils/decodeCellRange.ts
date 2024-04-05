import * as XLSX from 'xlsx'
import { CellRange } from '../types/CellRange'
export const decodeCellRange = (range: string): CellRange => {
  const decodedRange = XLSX.utils.decode_range(range)
  return {
    start: {
      colIndex: decodedRange.s.c,
      rowIndex: decodedRange.s.r,
    },
    end: {
      colIndex: decodedRange.e.c,
      rowIndex: decodedRange.e.r,
    }
  }
}
