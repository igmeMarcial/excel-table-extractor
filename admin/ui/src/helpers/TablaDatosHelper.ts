import { DataCell } from "../types/DataCell";
import { DatosInformacion } from "../types/DatosInformacion";
import { RangoCeldas } from "../types/RangoCeldas";
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
  getInformacion(tabla: DataCell[][]): DatosInformacion {
    const out: DatosInformacion = {
      tieneFilaTotales: this.tieneFilaTotales(tabla),
      tieneCeldasCombinadas: this.tieneCeldasCombinadas(tabla),
      valoresRango: this.getValoresRango(tabla)
    }
    out.recomendacionGrafica = this.getRecomendacionGraficaAutomatica(tabla);
    return out;
  }

  getTablaDatosFromRawArrays(rows: (string | number)[][]): DataCell[][] {
    let out: DataCell[][] = [];
    out = rows.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        return {
          value: cell,
          colIndex,
          rowIndex,
          rowspan: 1,
          colspan: 1
        };
      });
    });
    return out;
  }

  tieneFilaTotales(tabla: DataCell[][]): boolean {
    return this.getFilaTotalesRowIndex(tabla) > -1;
  }

  getFilaTotalesRowIndex(tabla: DataCell[][]): number {
    return tabla.findIndex((row) => row.some((cell) => cell.value?.toString().toLowerCase().match(/total/)));
  }

  getRowValues(
    tabla: DataCell[][],
    rowIndex: number,
    startIndex: number = 0,
    endIndex?: number
  ): (number | string)[] {
    const row = tabla[rowIndex];
    endIndex = endIndex || row.length - 1;
    return row.slice(startIndex, endIndex + 1).map((cell) => cell.value);
  }

  getColumnValues(
    tabla: DataCell[][],
    columnIndex: number,
    startIndex?: number,
    endIndex?: number
  ): (number | string)[] {
    startIndex = startIndex || 0;
    endIndex = endIndex || tabla.length - 1;
    return tabla.slice(startIndex, endIndex + 1).map((row) => row[columnIndex].value);
  }

  getRowNumberValues(
    tabla: DataCell[][],
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
    tabla: DataCell[][],
    columnIndex: number,
    startIndex?: number,
    endIndex?: number
  ): number[] {
    const column = this.getColumnValues(tabla, columnIndex, startIndex, endIndex);
    return column.map((value) => {
      return this.parseNumber(value);
    });
  }

  tieneCeldasCombinadas(tabla: DataCell[][]): boolean {
    return tabla.some((row) => row.some((cell) => cell.rowspan > 1 || cell.colspan > 1));
  }
  parseNumber(value: string | number): number {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return parseFloat(value.toString().replace(/,/g, ''));
  }
  getRecomendacionGraficaAutomatica(tabla: DataCell[][]): RecomendacionGrafica {
    const out = {} as any;
    out.tipoGrafico = 'columnas';
    return out;
  }
  /**
   * Algoritmo
   * El algoritmo para obtener el rango de celdas con valores numéricos es el siguiente:
   * 1.- Se recorre la tabla y se obtienen los valores numéricos de cada celda y se guardan en un arreglo bidimensional
   * 2.- Se añaden a la lista unicamente aquellos valores que sean numéricos y no sean celadas combinadas.
   * 3.- Por defecto se asigna como inicio del rango los indices de la primera y ultima celda del resultado del paso 1
   * 3.- Hasta el paso 2 funciona para la mayoría de los casos.
   * @param tabla
   * @returns
   */
  getValoresRango(tabla: DataCell[][]): RangoCeldas {
    const valoresNumericos: DataCell[][] = [];
    tabla.forEach((row, rowIndex) => {
      if (rowIndex === 0) return;
      const valores = [];
      for (const cell of row) {
        if (cell.rowspan > 1 || cell.colspan > 1) {
          if (valores.length > 0) {
            break;
          }
          continue;
        }
        if (!isNaN(+cell.value)) {
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
      inicio: {
        colIndex: valoresNumericos[0][0].colIndex,
        rowIndex: valoresNumericos[0][0].rowIndex,
      },
      fin: {
        colIndex: valoresNumericos[rowsLn - 1][colsLn - 1].colIndex,
        rowIndex: valoresNumericos[rowsLn - 1][colsLn - 1].rowIndex,
      }
    }

  }

  sonValoresContiguos(valores: DataCell[][]): boolean {
    let out = true;
    const startValueColIndex = valores[0][0].colIndex;
    const startValueRowIndex = valores[0][0].rowIndex;
    valores.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.colIndex !== startValueColIndex + colIndex || cell.rowIndex !== startValueRowIndex + rowIndex) {
          out = false;
        }
      });
    });
    return out;
  }
}

export default TablaDatosHelper.getInstance();
