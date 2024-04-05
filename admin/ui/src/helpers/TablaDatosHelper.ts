import { sonDatosAnualesPorDepartamento } from "../data-scanners/datos-anuales-por-departamento";
import sonDepartamentosTest from "../data-scanners/datos-anuales-por-departamentoTest";
import { Cell } from "../types/Cell";
import { DatosInformacion } from "../types/DatosInformacion";
import { CellRange } from "../types/CellRange";
import { RecomendacionGrafica } from "../types/RecomendacionGrafica";

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
      sonDepartamentosTest: sonDepartamentosTest(tabla),//borrar
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
    startIndex = startIndex || 0;
    endIndex = endIndex || tabla.length - 1;
    return tabla.slice(startIndex, endIndex + 1).map((row) => row[columnIndex].v);
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
   * El algoritmo para obtener el rango de celdas con valores numéricos es el siguiente:
   * 1.- Se recorre la tabla y se obtienen los valores numéricos de cada celda y se guardan en un arreglo bidimensional
   * 2.- Se añaden a la lista unicamente aquellos valores que sean numéricos y no sean celdas combinadas.
   * 3.- Por defecto se asigna como inicio del rango los indices de la primera y ultima celda del resultado del paso 1
   * 3.- Hasta el paso 2 funciona para la mayoría de los casos.
   * @param tabla
   * @returns
   */
  getValoresRango(tabla: Cell[][]): CellRange {
    const valoresNumericos: Cell[][] = [];
    tabla.forEach((row, rowIndex) => {
      if (rowIndex === 0) return;
      const valores = [];
      for (const cell of row) {
        if (cell.rs > 1 || cell.s > 1) {
          if (valores.length > 0) {
            break;
          }
          continue;
        }
        if (!isNaN(+cell.v)) {
          valores.push(cell);
        }
      }
      if (valores.length > 0) {
        valoresNumericos.push(valores);
      }
    });
    if (valoresNumericos.length === 0) {
      return null;
    }
    // Verificar el rango de valores numéricos no tiene celdas vacias
    const maxColumns = Math.max(...valoresNumericos.map((row) => row.length));
    const minColumns = Math.min(...valoresNumericos.map((row) => row.length));
    // Verificar que los valores numéricos sean contiguos
    if (!this.sonValoresContiguos(valoresNumericos)) {
      return null;
    }
    // Todo okay
    if (maxColumns !== minColumns) {
      return null;
    }
    const rowsLn = valoresNumericos.length;
    const colsLn = valoresNumericos[0].length;
    return {
      start: {
        colIndex: valoresNumericos[0][0].c,
        rowIndex: valoresNumericos[0][0].r,
      },
      end: {
        colIndex: valoresNumericos[rowsLn - 1][colsLn - 1].c,
        rowIndex: valoresNumericos[rowsLn - 1][colsLn - 1].r,
      }
    }

  }

  sonValoresContiguos(valores: Cell[][]): boolean {
    let out = true;
    const startValueColIndex = valores[0][0].c;
    const startValueRowIndex = valores[0][0].r;
    valores.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.c !== startValueColIndex + colIndex || cell.r !== startValueRowIndex + rowIndex) {
          out = false;
        }
      });
    });
    return out;
  }
}

export default TablaDatosHelper.getInstance();
