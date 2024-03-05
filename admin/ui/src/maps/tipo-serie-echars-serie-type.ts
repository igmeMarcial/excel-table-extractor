import * as echarts from 'echarts';
import { TipoSerie } from '../types/TipoSerie';
export const TIPO_SERIE_TO_ECHARS_SERIE_TYPE: Record<TipoSerie, echarts.EChartOption.Series> = {
  columnas: {
    type: 'bar'
  },
  barras: {
    type: 'bar'
  },
  areas: {
    type: 'line',
    areaStyle: {}
  },
  lineas: {
    type: 'line'
  },
  pie: {
    type: 'pie'
  }
}
