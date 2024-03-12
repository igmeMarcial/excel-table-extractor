import { DataCell } from "../types/DataCell";

// TOTO: Eliminar al final
const tablaDatosTest2: DataCell[][] = [
  [
    { value: 'Año',   rowIndex: 0, colIndex: 0 },
    { value: 'Valor', rowIndex: 0, colIndex: 1 },
    { value: 'Valor', rowIndex: 0, colIndex: 2 },
    { value: 'Valor', rowIndex: 0, colIndex: 3 },
    { value: 'Valor', rowIndex: 0, colIndex: 4 }
  ],
  [
    { value: 2018, rowIndex: 1, colIndex: 0, colSpan: 1 },
    { value: 100,  rowIndex: 1, colIndex: 1, colSpan: 1 },
    { value: 100,  rowIndex: 1, colIndex: 2, colSpan: 3 }
  ],
  [
    { value: '2C',    rowIndex: 2, colIndex: 0, colSpan: 2, },
    { value: 'Valor', rowIndex: 2, colIndex: 2, rowSpan: 3},
    { value: 'Valor', rowIndex: 2, colIndex: 3, rowSpan: 3},
    { value: 'Valor', rowIndex: 2, colIndex: 3, rowSpan: 3}
  ],
  [
    { value: '2R', rowIndex: 3, colIndex: 0, rowSpan: 2 },
    { value: 200,  rowIndex: 3, colIndex: 1, colSpan: 1 }
  ],
  [
    { value: '1C', rowIndex: 4, colIndex: 0 },
  ],
];
export default tablaDatosTest2;
