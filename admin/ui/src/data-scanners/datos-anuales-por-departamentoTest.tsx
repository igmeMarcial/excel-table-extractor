import { Cell } from '../types/Cell';

const sonDepartamentosTest = (tabla: Cell[][]): boolean => {
  if (tabla.length === 0 || tabla[0].length === 0) {
    return false;
  }
  // Obtiene la primera celda de la tabla
  const firstCell = tabla[0][0];
  // console.log(firstCell);
  //   console.log('son departamentos');
  // 1.- La primera celda de la tabla debe conterner la palabra "departamento"
  if (firstCell.v.toString().toLowerCase().includes('departamento') === false) {
    // console.log('no es departamento');
    return false;
  }
  // Obtiene la primera columna de la tabla
  const firstColumn = tabla.map((row) => row[0]);
  // Verifica si todos los valores de la primera columna son cadenas de texto
  if (firstColumn.some((cell) => cell.t !== 's')) {
    return false;
  }
  // Obtiene la primera fila de la tabla a partir de la segunda columna
  const firstRow = tabla[0].slice(1);

  // Define una expresión regular para verificar el formato de los años
  const re = /^\d{4}([ ]*\w\/)?$/;
  // Verifica si todos los valores de la primera fila son años válidos
  if (firstRow.some((cell) => !re.test(cell.v.toString()))) {
    return false;
  }

  // Obtiene los valores de datos de la tabla, excluyendo la primera fila y la primera columna
  const dataValues = tabla.slice(1).map((row) => row.slice(1));

  // Verifica si todos los valores de la tabla son números
  if (dataValues.some((row) => row.some((cell) => cell.t !== 'n'))) {
    return false;
  }
  //Verificar que todas las filas tengan la misma cantidad de columna
  const numColumns = tabla[0].length;
  if (tabla.some((row) => row.length !== numColumns)) {
    return false;
  }
  //   //Verificar si alguna celda contiene la palabra "total" en cualquier formato
  //   if (
  //     tabla.some((row) => row.some((cell) => /total/i.test(cell.v.toString())))
  //   ) {
  //     return false;
  //   }

  // Si la tabla cumple con todas las condiciones, devuelve true
  return true;
};
export default sonDepartamentosTest;
