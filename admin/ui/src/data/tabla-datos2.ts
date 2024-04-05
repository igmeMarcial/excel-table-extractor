import { Cell } from "../types/Cell";

// TOTO: Eliminar al final
const tablaDatosTest2: Cell[][] = [
  [
    { v: 'Año', r: 0, c: 0, t: 's' },
    { v: 'Valor', r: 0, c: 1, t: 's' },
    { v: 'Valor', r: 0, c: 2, t: 's' },
    { v: 'Valor', r: 0, c: 3, t: 's' },
    { v: 'Valor', r: 0, c: 4, t: 's' }
  ],
  [
    { v: 2018, r: 1, c: 0, s: 1, t: 's' },
    { v: 100, r: 1, c: 1, s: 1, t: 'n' },
    { v: 100, r: 1, c: 2, s: 3, t: 'n' }
  ],
  [
    { v: '2C', r: 2, c: 0, s: 2, t: 's' },
    { v: 'Valor', r: 2, c: 2, rs: 3, t: 's' },
    { v: 'Valor', r: 2, c: 3, rs: 3, t: 's' },
    { v: 'Valor', r: 2, c: 3, rs: 3, t: 's' }
  ],
  [
    { v: '2R', r: 3, c: 0, rs: 2, t: 's' },
    { v: 200, r: 3, c: 1, s: 1, t: 'n' }
  ],
  [
    { v: '1C', r: 4, c: 0, t: 's' },
  ],
];
export default tablaDatosTest2;
