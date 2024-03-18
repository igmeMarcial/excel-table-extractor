export const CELL_POSITION_HEADER: CellPosition = 'h'
export const CELL_POSITION_BODY: CellPosition = 'b'
export const CELL_POSITION_FOOTER: CellPosition = 'f'

export const CELL_VALUE_TYPE_STRING: CellValueType = 's'
export const CELL_VALUE_TYPE_NUMBER: CellValueType = 'n'

export type CellPosition = 'h' | 'b' | 'f'
export type CellValueType = 's' | 'n'  //t: type s: string, n: number
export interface DataCell {
  v: string | number
  r: number
  c: number
  s?: number
  rs?: number
  p?: CellPosition
  t: CellValueType
}
