import { DataCell } from "../types/DataCell";
import tablaDatosHelper from "./TablaDatosHelper";
import { Grafico } from "../types/Grafico";
import { RangoCeldas } from "../types/RangoCeldas";
import { Serie } from "../types/Serie";

export class GraficoHelper {

  private static _instance: GraficoHelper;

  public static getInstance() {
    if (!GraficoHelper._instance) {
      GraficoHelper._instance = new GraficoHelper();
    }
    return GraficoHelper._instance;
  }
  getGraficosDefecto(tabla: DataCell[][]): Grafico[] {
    const dataInfo = tablaDatosHelper.getInformacion(tabla);

    // Cuando la tabla tiene una fila final con totales
    const valoresRango = dataInfo.valoresRango;
    if (!valoresRango) {
      return [{}];
    }
    console.log('valoresRango', valoresRango);
    console.log('dataInfo', dataInfo);
    // Categoria
    const categorias = tablaDatosHelper.getRowValues(tabla, valoresRango.inicio.rowIndex - 1, valoresRango.inicio.colIndex, valoresRango.fin.colIndex) as string[];
    // Datos anuales por departamento
    if (dataInfo.sonDatosAnualesPorDepartamento) {
      // Rango de series, solo la ultima columna
      const serieRango = {
        inicio: { rowIndex: valoresRango.inicio.rowIndex, colIndex: valoresRango.fin.colIndex },
        fin: { rowIndex: valoresRango.fin.rowIndex, colIndex: valoresRango.fin.colIndex }
      };
      const categorias = tablaDatosHelper.getColumnValues(tabla, 0, 1) as string[];
      return [
        {
          categorias,
          tipo: 'columnas',
          series: this.getVerticalSeries(tabla, serieRango),
          rotacionEtiquetasCategorias: 30,
          mostrarLeyenda: false
        }
      ];
    }
    // Si la tabla tiene una fila de totales solo se muestra un gráfico de barras
    if (dataInfo.tieneFilaTotales) {
      const filaTotalesRowIndex = tablaDatosHelper.getFilaTotalesRowIndex(tabla);
      const totalValoresRango = {
        inicio: { rowIndex: filaTotalesRowIndex, colIndex: valoresRango.inicio.colIndex },
        fin: { rowIndex: filaTotalesRowIndex, colIndex: valoresRango.fin.colIndex }
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

  private getHorizontalSeries(tabla: DataCell[][], rangoValores: RangoCeldas): Serie[] {
    const out: Serie[] = [];
    for (let i = rangoValores.inicio.rowIndex; i <= rangoValores.fin.rowIndex; i++) {
      // colIdex de nombre de la serie
      let nombreColIndex = rangoValores.inicio.colIndex - 1;
      let nombre = '';
      if (nombreColIndex >= 0) {
        nombre = tabla[i][nombreColIndex].v as string;
      } else {
        nombre = `Serie ${i}`;
      }
      const valores = tablaDatosHelper.getRowNumberValues(tabla, i, rangoValores.inicio.colIndex, rangoValores.fin.colIndex);
      out.push({
        nombre,
        valores
      });
    }
    return out;
  }
  private getVerticalSeries(tabla: DataCell[][], rangoValores: RangoCeldas): Serie[] {
    const out: Serie[] = [];
    for (let colIndex = rangoValores.inicio.colIndex; colIndex <= rangoValores.fin.colIndex; colIndex++) {
      // colIdex de nombre de la serie
      let nombreRowIndex = rangoValores.inicio.rowIndex - 1;
      let nombre = '';
      if (nombreRowIndex >= 0) {
        nombre = tabla[nombreRowIndex][colIndex].v as string;
      } else {
        nombre = `Serie ${colIndex}`;
      }
      const valores = tablaDatosHelper.getColumnNumberValues(tabla, colIndex, rangoValores.inicio.rowIndex, rangoValores.fin.rowIndex);
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
