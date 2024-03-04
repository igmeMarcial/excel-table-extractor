import { DataCell } from "../types/DataCell";
import tablaDatosHelper from "./TablaDatosHelper";
import { EChartsReactProps } from "echarts-for-react";
import { Grafico } from "../types/Grafico";

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
    if (dataInfo.tieneFilaTotales) {
      const filaTotalesRowIndex = tablaDatosHelper.getFilaTotalesRowIndex(tabla);
      const valoresTotales = tablaDatosHelper.getRowNumberValues(tabla, filaTotalesRowIndex, valoresRango.inicio.colIndex, valoresRango.fin.colIndex);
      const categoriasTotales = tablaDatosHelper.getRowValues(tabla, valoresRango.inicio.rowIndex - 1, valoresRango.inicio.colIndex, valoresRango.fin.colIndex);
      out.push({
        categorias: categoriasTotales as string[],
        tipoGrafico: 'barras',
        series: [
          {
            valores: valoresTotales
          }
        ]
      });
    } else {
      out.push({
        tipoGrafico: 'barras',
        //series: tablaDatosHelper.getRowNumberValues(tabla, tabla.length - 1, 1)
      });
    }
    return out;
  }

  toEchartsProps(grafico: Grafico): EChartsReactProps {
    const out: EChartsReactProps = {
      option: {
        title: {
          text: grafico.titulo
        },
        xAxis: {
          type: 'category',
          data: grafico.categorias,
        },
        series: [
          {
            name: 'Sales',
            type: 'bar',
            data: grafico.series[0].valores
          }
        ]
      }
    };
    return out;
  }

  /**
   * deepAssign
   *
   * Función para asignar recursivamente las propiedades de un objeto a otro
   * Creditos: https://stackoverflow.com/a/61395050/13780697
   *
   * @param {Object} target Objeto destino
   * @param {Object} sources Uno o más objetos origen
   * @returns {Object} Objeto destino con las propiedades de los objetos origen
   */
  deepAssign = (target, ...sources) => {
    for (const source of sources) {
      for (const k in source) {
        const vs = source[k], vt = target[k]
        if (Object(vs) == vs && Object(vt) === vt) {
          target[k] = this.deepAssign(vt, vs)
          continue
        }
        target[k] = this.deepClone(source[k])
      }
    }
    return target
  }
  deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    const cloned = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = this.deepClone(obj[key])
      }
    }

    return cloned
  }
}

export default GraficoHelper.getInstance();
