export interface DataCell {
  value: string | number;
  rowIndex: number;
  colIndex: number;
  colspan?: number;
  rowspan?: number
}
