export interface DataCell {
  value: string | number;
  rowIndex: number;
  colIndex: number;
  colSpan?: number;
  rowSpan?: number;
  typeCell?: 'header' | 'body' | 'footer';
  type?: 'string' |'number'
}
