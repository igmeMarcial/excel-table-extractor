import { Cell } from '../types/Cell'

/**
 * Determina si la tabla tiene datos anuales por departamento
 * Condiciones:
 * 1.- La primera celda de la tabla debe ser "Departamento"
 * 2.- Todos los valores de la primera columna deben ser cadenas de texto
 * 3.- Todos los valores de la primera fila deben ser números de 4 dígitos que representen un año y opcionalmente pueder tener una cita al final
 * 4.- Todos los valores de la tabla deben ser números
 * @param tabla
 * @returns
 */
export const sonDatosAnualesPorDepartamento = (tabla: Cell[][]): boolean => {
  if (tabla.length === 0 || tabla[0].length === 0) {
    return false
  }
  const firstCell = tabla[0][0];
  // 1.- La primera celda de la tabla debe conterner la palabra "departamento"
  if (firstCell.v.toString().toLowerCase().includes('departamento') === false) {
    return false
  }
  // 2.- Todos los valores de la primera columna deben ser cadenas de texto

  const firstColumn = tabla.map((row) => row[0]);
  if (firstColumn.some((cell) => cell.t !== 's')) {
    return false
  }

  // 3.- Todos los valores de la primera fila, a partir de la segunda columna deben ser números de 4 dígitos que representen un año
  // Año puede tener el formato 2021, '2021' o 2021 x/
  const firstRow = tabla[0].slice(1);
  const re = /^\d{4}( *\w\/)?$/
  if (firstRow.some((cell) => !re.test(cell.v.toString()))) {
    return false;
  }
  return true
}
