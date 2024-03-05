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
    const out: Grafico[] = [];
    // Cuando la tabla tiene una fila final con totales
    const valoresRango = dataInfo.valoresRango;
    if (!valoresRango) {
      return [{}];
    }
    // Categoria
    const categorias = tablaDatosHelper.getRowValues(tabla, valoresRango.inicio.rowIndex - 1, valoresRango.inicio.colIndex, valoresRango.fin.colIndex) as string[];
    // Si la tabla tiene una fila de totales solo se muestra un gráfico de barras
    if (dataInfo.tieneFilaTotales) {
      const filaTotalesRowIndex = tablaDatosHelper.getFilaTotalesRowIndex(tabla);
      const totalValoresRango = {
        inicio: { rowIndex: filaTotalesRowIndex, colIndex: valoresRango.inicio.colIndex },
        fin: { rowIndex: filaTotalesRowIndex, colIndex: valoresRango.fin.colIndex }
      };
      out.push({
        categorias,
        tipo: 'columnas',
        series: this.getSeries(tabla, totalValoresRango),
      });
    } else {
      out.push({
        categorias,
        tipo: 'lineas',
        series: this.getSeries(tabla, valoresRango),
      });
    }
    return out;
  }

  private getSeries(tabla: DataCell[][], rangoValores: RangoCeldas): Serie[] {
    const out: Serie[] = [];
    for (let i = rangoValores.inicio.rowIndex; i <= rangoValores.fin.rowIndex; i++) {
      // colIdex de nombre de la serie
      let nombreColIndex = rangoValores.inicio.colIndex - 1;
      let nombre = '';
      if (nombreColIndex >= 0) {
        nombre = tabla[i][nombreColIndex].value as string;
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

}

export default GraficoHelper.getInstance();
