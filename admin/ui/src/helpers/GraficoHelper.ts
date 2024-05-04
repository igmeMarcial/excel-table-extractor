import { Cell } from '../types/Cell';
import { Grafico } from '../types/Grafico';
import { CellRange } from '../types/CellRange';
import { Serie } from '../types/Serie';
import { encodeCellRange } from '../utils/encodeCellRange';
import { deepAssign } from '../utils/object-utils';
import { Estadistica } from '../types/Estadistica';
import tablaDatosHelper from './TablaDatosHelper';

export class GraficoHelper {

  private static _instance: GraficoHelper;

  public static getInstance() {
    if (!GraficoHelper._instance) {
      GraficoHelper._instance = new GraficoHelper();
    }
    return GraficoHelper._instance;
  }
  getGraficoDefecto(estadistica: Estadistica): Grafico {
    const tabla = estadistica.datos;
    const dataInfo = tablaDatosHelper.getInformacion(tabla);
    let defaults = {};
    const valoresRango = dataInfo.valoresRango;
    if (!valoresRango) {
      return defaults;
    }

    // Si la tabla tiene una fila de totales solo se muestra un gráfico de barras
    if (dataInfo.tieneFilaTotales) {
      return this.getGraficoParaDatosConFilaTotales(defaults, tabla);
    }

    // Datos anuales por departamento
    if (dataInfo.sonDatosAnualesPorDepartamento) {
      return this.getGraficoParaDatosAnualesPorDepartamento(defaults, tabla);
    }

    // Categoria
    const categorias = tablaDatosHelper.getRowValues(tabla, valoresRango.start.rowIndex - 1, valoresRango.start.colIndex, valoresRango.end.colIndex) as string[];
    return deepAssign(defaults, {
      categorias,
      tipo: 'lineas',
      series: this.getHorizontalSeries(tabla, valoresRango),
    });
  }

  private getGraficoParaDatosAnualesPorDepartamento(defaults: Grafico, tabla: Cell[][]): Grafico {
    // Valores: Última columna sin considerar la primera celda
    const lastRowIndex = tabla.length - 1;
    const lastColIndex = tabla[0].length - 1;
    const rangoValores: CellRange = {
      start: { rowIndex: 1, colIndex: lastColIndex },
      end: { rowIndex: lastRowIndex, colIndex: lastColIndex }
    };
    // Categorías: Primera columna sin considerar la primera celda
    const rangoCategorias: CellRange = {
      start: { rowIndex: 1, colIndex: 0 },
      end: { rowIndex: lastRowIndex, colIndex: 0 }
    };
    // Series: Última celda de la primera fila
    const rangoSeries: CellRange = {
      start: { rowIndex: 0, colIndex: lastColIndex },
      end: { rowIndex: 0, colIndex: lastColIndex }
    };
    const categorias = tablaDatosHelper.getColumnValues(tabla, 0, 1) as string[];
    return deepAssign(defaults, {
      categorias,
      tipo: 'columnas',
      series: this.getVerticalSeries(tabla, rangoValores),
      rotacionEtiquetasCategorias: 90,
      mostrarLeyenda: false,
      referenciasTablaDatos: {
        rangoValores: encodeCellRange(rangoValores),
        rangoCategorias: encodeCellRange(rangoCategorias),
        rangoSeries: encodeCellRange(rangoSeries),
      }
    });
  }
  private getGraficoParaDatosConFilaTotales(defaults: Grafico, tabla: Cell[][]): Grafico {
    // Valores: Última fila sin considerar la primera celda
    const lastRowIndex = tabla.length - 1;
    const lastColIndex = tabla[0].length - 1;
    const rangoValores: CellRange = {
      start: { rowIndex: lastRowIndex, colIndex: 1 },
      end: { rowIndex: lastRowIndex, colIndex: lastColIndex }
    };
    // Categorías: La primera celda de la primera fila
    const rangoCategorias: CellRange = {
      start: { rowIndex: lastRowIndex, colIndex: 0 },
      end: { rowIndex: lastRowIndex, colIndex: 0 }
    };
    // Series: La primera fila sin considerar la primera celda
    const rangoSeries: CellRange = {
      start: { rowIndex: 0, colIndex: 1 },
      end: { rowIndex: 0, colIndex: lastColIndex }
    };
    const categorias = tablaDatosHelper.getRowValues(tabla, 0, 1) as string[];
    return deepAssign(defaults, {
      categorias,
      tipo: 'columnas',
      series: this.getHorizontalSeries(tabla, rangoValores),
      mostrarLeyenda: false,
      referenciasTablaDatos: {
        rangoValores: encodeCellRange(rangoValores),
        rangoCategorias: encodeCellRange(rangoCategorias),
        rangoSeries: encodeCellRange(rangoSeries),
      }
    });
  }
  private getHorizontalSeries(tabla: Cell[][], rangoValores: CellRange): Serie[] {
    const out: Serie[] = [];
    for (let i = rangoValores.start.rowIndex; i <= rangoValores.end.rowIndex; i++) {
      // colIdex de nombre de la serie
      let nombreColIndex = rangoValores.start.colIndex - 1;
      let nombre = '';
      if (nombreColIndex >= 0) {
        nombre = tabla[i][nombreColIndex].v as string;
      } else {
        nombre = `Serie ${i}`;
      }
      const valores = tablaDatosHelper.getRowNumberValues(tabla, i, rangoValores.start.colIndex, rangoValores.end.colIndex);
      out.push({
        nombre,
        valores
      });
    }
    return out;
  }
  private getVerticalSeries(tabla: Cell[][], rangoValores: CellRange): Serie[] {
    const out: Serie[] = [];
    for (let colIndex = rangoValores.start.colIndex; colIndex <= rangoValores.end.colIndex; colIndex++) {
      // colIdex de nombre de la serie
      let nombreRowIndex = rangoValores.start.rowIndex - 1;
      let nombre = '';
      if (nombreRowIndex >= 0) {
        nombre = tabla[nombreRowIndex][colIndex].v as string;
      } else {
        nombre = `Serie ${colIndex}`;
      }
      const valores = tablaDatosHelper.getColumnNumberValues(tabla, colIndex, rangoValores.start.rowIndex, rangoValores.end.rowIndex);
      out.push({
        nombre,
        valores,
        mostrarEtiquetas: true
      });
    }
    return out;
  }

}

export default GraficoHelper.getInstance();
