import { EChartsReactProps } from "echarts-for-react"
import { Grafico } from "../types/Grafico"
import { ECHART_SERIES_DEFAULT_PROPS, ECHATS_DEFALT_PROPS } from "../config/echarts-default-props"
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
      const mostrarEtiquetas = !(serie.mostrarEtiquetas === false || this.grafico.mostrarEtiquetas === false)
      const serieProps: any = {
        ...this.getTypeProps(serie),
        name: serie.nombre,
        data: serie.valores as any[],
        label: {
          show: mostrarEtiquetas
        },
        itemStyle: this.getItemStyle(serie)
      }
      if (this.grafico.numeroDecimalesEtiquetas || serie.numeroDecimalesEtiquetas) {
        // Redondear a n decimales
        serieProps.label.formatter = (params) => {
          return params.value.toFixed(this.grafico.numeroDecimalesEtiquetas)
        }
      }
      return deepAssign({}, ECHART_SERIES_DEFAULT_PROPS, serieProps)
    })
  }
  private getItemStyle(serie: Serie): echarts.EChartOption.SeriesLine['itemStyle'] {
    if (serie.color) {
      return {
        color: serie.color
      }
    }
    return {}
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
