import { Cell } from "../types/Cell";
import tablaDatosHelper from "./TablaDatosHelper";
import { Grafico } from "../types/Grafico";
import { CellRange } from "../types/CellRange";
import { Serie } from "../types/Serie";

export class GraficoHelper {

  private static _instance: GraficoHelper;

  public static getInstance() {
    if (!GraficoHelper._instance) {
      GraficoHelper._instance = new GraficoHelper();
    }
    return GraficoHelper._instance;
  }
  getGraficosDefecto(tabla: Cell[][]): Grafico[] {
    const dataInfo = tablaDatosHelper.getInformacion(tabla);

    // Cuando la tabla tiene una fila final con totales
    const valoresRango = dataInfo.valoresRango;
    if (!valoresRango) {
      return [{}];
    }
    console.log('valoresRango', valoresRango);
    console.log('dataInfo', dataInfo);
    // Categoria
    const categorias = tablaDatosHelper.getRowValues(tabla, valoresRango.start.rowIndex - 1, valoresRango.start.colIndex, valoresRango.end.colIndex) as string[];
    // Datos anuales por departamento
    if (dataInfo.sonDatosAnualesPorDepartamento) {
      return [
        this.getGraficoParaDatosAnualesPorDepartamento(valoresRango, tabla)
      ];
    }
    // Si la tabla tiene una fila de totales solo se muestra un gráfico de barras
    if (dataInfo.tieneFilaTotales) {
      const filaTotalesRowIndex = tablaDatosHelper.getFilaTotalesRowIndex(tabla);
      const totalValoresRango: CellRange = {
        start: { rowIndex: filaTotalesRowIndex, colIndex: valoresRango.start.colIndex },
        end: { rowIndex: filaTotalesRowIndex, colIndex: valoresRango.end.colIndex }
      };
      return [
        {
          categorias,
          tipo: 'columnas',
          series: this.getHorizontalSeries(tabla, totalValoresRango),
        }
      ];
    }
    return [
      {
        categorias,
        tipo: 'lineas',
        series: this.getHorizontalSeries(tabla, valoresRango),
      }
    ];
  }

  private getGraficoParaDatosAnualesPorDepartamento(valoresRango: CellRange, tabla: Cell[][]): Grafico {
    // Rango de series, solo la ultima columna
    const serieRango: CellRange = {
      start: { rowIndex: valoresRango.start.rowIndex, colIndex: valoresRango.end.colIndex },
      end: { rowIndex: valoresRango.end.rowIndex, colIndex: valoresRango.end.colIndex }
    };
    const categorias = tablaDatosHelper.getColumnValues(tabla, 0, 1) as string[];
    return {
      categorias,
      tipo: 'columnas',
      series: this.getVerticalSeries(tabla, serieRango),
      rotacionEtiquetasCategorias: 30,
      mostrarLeyenda: false
    };
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
