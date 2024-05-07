// Función para validar el rango
export const validateCellRange = (range) => {
  // Expresión regular para validar el formato A4:Y3
  const regex = /^[A-Z]+[1-9]+\d*:[A-Z]+[1-9]+\d*$/;
  if (!regex.test(range)) {
    return false;
  }
  // Obtener las coordenadas de ambas celdas en el rango
  const [coordA, coordB] = range.split(':');
  const filaA = parseInt(coordA.match(/\d+$/)[0]);
  const filaB = parseInt(coordB.match(/\d+$/)[0]);
  // Verificar que la primera fila sea menor o igual que la segunda fila
  return filaA <= filaB;
};
