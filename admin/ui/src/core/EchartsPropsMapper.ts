import { EChartsReactProps } from "echarts-for-react"
import { Grafico } from "../types/Grafico"
import { ECHATS_DEFALT_PROPS } from "../config/grafico-propiedades-defecto"
import { deepAssign } from "../utils/object-utils"
import * as echarts from 'echarts'
import { TIPO_SERIE_TO_ECHARS_SERIE_TYPE } from "../maps/tipo-serie-echars-serie-type"
import { Serie } from "../types/Serie"
import { TipoGrafico } from "../types/TipoGrafico"

export class EchartsPropsMapper {
  private static readonly _instance = new EchartsPropsMapper()
  private tipoGraficoDefecto: TipoGrafico = 'columnas'
  private grafico: Grafico
  private series: Serie[]
  private constructor() { }

  static get instance() {
    return EchartsPropsMapper._instance
  }
  public map(grafico: Grafico): EChartsReactProps {
    this.grafico = grafico
    this.series = grafico.series || []
    const props: EChartsReactProps = {
      option: {
        title: {
          text: grafico.titulo || 'Título del gráfico',
        },
        xAxis: this.getXAxisConfig(),
        yAxis: this.getYAxisConfig(),
        series: this.getSeries(),
        legend: this.getLegend(),
      }
    }
    return deepAssign({}, ECHATS_DEFALT_PROPS, props)
  }
  private getSeries(): echarts.EChartOption.Series[] {
    const rawSeries = this.grafico.series || []
    return rawSeries.map((serie) => {
      return {
        ...this.getTypeProps(serie),
        name: serie.nombre,
        data: serie.valores,
      }
    })
  }
  private getTypeProps(serie: Serie): echarts.EChartOption.Series {
    const tipo = serie.tipo || this.grafico.tipo || this.tipoGraficoDefecto
    const props = TIPO_SERIE_TO_ECHARS_SERIE_TYPE[tipo]
    if (props) {
      return props
    }
    return {
      type: 'column'
    }
  }
  private getXAxisConfig(): echarts.EChartOption.XAxis {
    const main: echarts.EChartOption.XAxis = {
      type: this.getXAxisType(),
    }
    if (main.type === 'category') {
      main.data = this.grafico.categorias
      main.axisLabel = this.getCategoryAxisLabel()
    }
    return main
  }
  private getYAxisConfig(): echarts.EChartOption.YAxis {
    const main: echarts.EChartOption.YAxis = {
      type: this.getYAxisType(),
    }
    if (main.type === 'category') {
      main.data = this.grafico.categorias
    }
    return main
  }
  private getCategoryAxisLabel(): echarts.EChartOption.BasicComponents.CartesianAxis.Label {
    return {
      rotate: this.grafico.rotacionEtiquetasCategorias || 0
    }
  }
  private getXAxisType(): 'category' | 'value' {
    if (this.grafico.tipo === 'barras') {
      return 'value'
    }
    return 'category'
  }
  private getYAxisType(): 'value' | 'category' {
    if (this.grafico.tipo === 'barras') {
      return 'category'
    }
    return 'value'
  }
  private getLegend(): echarts.EChartOption.Legend {
    // Si mostrarLeyenda está explicitamente definido como false, no se muestra
    if (this.grafico.mostrarLeyenda === false) {
      return {
        show: false
      }
    }
    return {
      data: this.series.map((serie) => serie.nombre)
    }
  }
}

export default EchartsPropsMapper.instance
