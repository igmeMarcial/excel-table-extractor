import { sonDatosAnualesPorDepartamento } from "../data-scanners/datos-anuales-por-departamento";
import { Cell } from "../types/Cell";
import { DatosInformacion } from "../types/DatosInformacion";
import { CellRange } from "../types/CellRange";
import { RecomendacionGrafica } from "../types/RecomendacionGrafica";
import { celdaConValorEstadistico } from "../utils/estadistica-utils";

export class TablaDatosHelper {

  private static _instance: TablaDatosHelper;

  public static getInstance() {
    if (!TablaDatosHelper._instance) {
      TablaDatosHelper._instance = new TablaDatosHelper();
    }
    return TablaDatosHelper._instance;
  }
  //
  getInformacion(tabla: Cell[][]): DatosInformacion {
    const out: DatosInformacion = {
      sonDatosAnualesPorDepartamento: sonDatosAnualesPorDepartamento(tabla),
      tieneFilaTotales: this.tieneFilaTotales(tabla),
      tieneCeldasCombinadas: this.tieneCeldasCombinadas(tabla),
      valoresRango: this.getValoresRango(tabla)
    }
    out.recomendacionGrafica = this.getRecomendacionGraficaAutomatica(tabla);
    return out;
  }

  getTablaDatosFromRawArrays(rows: (string | number)[][]): Cell[][] {
    let out: Cell[][] = [];
    out = rows.map((row, rowIndex) => {
      const newRow: Cell[] = [];
      row.forEach((cell, colIndex) => {
        const value = cell;
        const type = typeof cell === 'number' ? 'n' : 's';
        if (value !== null) {
          newRow.push({
            v: value,
            c: colIndex,
            r: rowIndex,
            t: type,
          });
        }
      });
      return newRow;
    });
    return out;
  }

  tieneFilaTotales(tabla: Cell[][]): boolean {
    return this.getFilaTotalesRowIndex(tabla) > -1;
  }

  getFilaTotalesRowIndex(tabla: Cell[][]): number {
    return tabla.findIndex((row) => row.some((cell) => cell.v?.toString().toLowerCase().match(/total/)));
  }

  getRowValues(
    tabla: Cell[][],
    rowIndex: number,
    startIndex: number = 0,
    endIndex?: number
  ): (number | string)[] {
    const row = tabla[rowIndex];
    endIndex = endIndex || row.length - 1;
    return row.slice(startIndex, endIndex + 1).map((cell) => cell.v);
  }

  getColumnValues(
    tabla: Cell[][],
    columnIndex: number,
    startIndex?: number,
    endIndex?: number
  ): (number | string)[] {
    const out = [];
    startIndex = startIndex || 0;
    endIndex = endIndex || tabla.length - 1;
    const searchSection = tabla.slice(startIndex, endIndex + 1);
    searchSection.forEach(row => {
      row.forEach((cell, index) => {
        if (cell.c === columnIndex) {
          out.push(cell.v);
        }
      });
    });
    return out;
  }

  getRowNumberValues(
    tabla: Cell[][],
    rowIndex: number,
    startIndex?: number,
    endIndex?: number
  ): number[] {
    const row = this.getRowValues(tabla, rowIndex, startIndex, endIndex);
    return row.map((value) => {
      return this.parseNumber(value);
    });
  }

  getColumnNumberValues(
    tabla: Cell[][],
    columnIndex: number,
    startIndex?: number,
    endIndex?: number
  ): number[] {
    const column = this.getColumnValues(tabla, columnIndex, startIndex, endIndex);
    return column.map((value) => {
      return this.parseNumber(value);
    });
  }
  getRangeValues<T>(
    tabla: Cell[][],
    range: CellRange
  ): T[][] {
    const out: T[][] = [];
    for (let rowIndex = range.start.rowIndex; rowIndex <= range.end.rowIndex; rowIndex++) {
      const row = [];
      for (let colIndex = range.start.colIndex; colIndex <= range.end.colIndex; colIndex++) {
        const cell = tabla[rowIndex][colIndex];
        row.push(cell.v as T);
      }
      out.push(row);
    }
    return out;
  }
  tieneCeldasCombinadas(tabla: Cell[][]): boolean {
    return tabla.some((row) => row.some((cell) => cell.rs > 1 || cell.s > 1));
  }
  parseNumber(value: string | number): number {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return parseFloat(value.toString().replace(/,/g, ''));
  }
  getRecomendacionGraficaAutomatica(tabla: Cell[][]): RecomendacionGrafica {
    const out = {} as any;
    out.tipoGrafico = 'columnas';
    return out;
  }
  /**
   * Algoritmo
   * El algoritmo para obtener el rango de celdas con valores estadísticos es el siguiente:
   *
   * 1.- Se recorre la tabla y se obtienen los valores estadísticos de cada celda y se guardan en un arreglo bidimensional
   * 2.- Se añaden a la lista unicamente aquellos valores que son considerados valores estadísticos válidos y no sean celdas combinadas.
   * 3.- Por defecto se asigna como inicio del rango los indices de la primera y ultima celda del resultado del paso 1
   * 3.- Hasta el paso 2 funciona para la mayoría de los casos.
   * @param tabla
   * @returns
   */
  getValoresRango(tabla: Cell[][]): CellRange {
    const valoresEstadisticosValidos: Cell[][] = [];
    tabla.forEach((row, rowIndex) => {
      // La primera fila no se considera
      if (rowIndex === 0) return;
      const valores = [];
      let colIdex = 0;
      for (const cell of row) {
        // Celda combinada
        if (cell.rs > 1 || cell.s > 1) {
          // Si ya existen valores, singifica que se se ha identificado una nueva celda conbinada al final de una fila
          // por tanto no califica como parte del rango de valores estadísticos.
          if (valores.length > 0) {
            break;
          }
          continue;
        }
        // La primera celda de la fila no se considera
        if (colIdex === 0) {
          colIdex++;
          continue;
        }
        // Valor estadístico
        if (celdaConValorEstadistico(cell, false)) {
          valores.push(cell);
        }
        colIdex++;
      }
      if (valores.length > 0) {
        valoresEstadisticosValidos.push(valores);
      }
    });
    if (valoresEstadisticosValidos.length === 0) {
      return null;
    }
    // Verificar el rango de valores numéricos no tiene celdas vacias
    const maxColumns = Math.max(...valoresEstadisticosValidos.map((row) => row.length));
    const minColumns = Math.min(...valoresEstadisticosValidos.map((row) => row.length));
    // Verificar que los valores numéricos sean contiguos
    if (!this.sonValoresContiguos(valoresEstadisticosValidos)) {
      return null;
    }
    if (maxColumns !== minColumns) {
      return null;
    }
    // Todo okay
    const rowsLn = valoresEstadisticosValidos.length;
    const colsLn = valoresEstadisticosValidos[0].length;
    return {
      start: {
        colIndex: valoresEstadisticosValidos[0][0].c,
        rowIndex: valoresEstadisticosValidos[0][0].r,
      },
      end: {
        colIndex: valoresEstadisticosValidos[rowsLn - 1][colsLn - 1].c,
        rowIndex: valoresEstadisticosValidos[rowsLn - 1][colsLn - 1].r,
      }
    }

  }

  sonValoresContiguos(valores: Cell[][]): boolean {
    console.log(valores)
    const startValueColIndex = valores[0][0].c;
    const startValueRowIndex = valores[0][0].r;
    return valores.every((row, rowIndex) => {
      return row.every((cell, colIndex) => {
        return cell.c === startValueColIndex + colIndex && cell.r === startValueRowIndex + rowIndex;
      });
    });
  }
}

export default TablaDatosHelper.getInstance();
