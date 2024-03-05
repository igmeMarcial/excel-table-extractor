import { EChartsReactProps } from "echarts-for-react"
import { Grafico } from "../types/Grafico"
import { ECHATS_DEFALT_PROPS } from "../config/grafico-propiedades-defecto"
import { deepAssign } from "../utils/object-utils"
import * as echarts from 'echarts'
import { TipoSerie } from "../types/TipoSerie"
import { TIPO_SERIE_TO_ECHARS_SERIE_TYPE } from "../maps/tipo-serie-echars-serie-type"
import { Serie } from "../types/Serie"
import { TipoGrafico } from "../types/TipoGrafico"

export class EchartsPropsMapper {
  private static readonly _instance = new EchartsPropsMapper()
  private tipoGraficoDefecto: TipoGrafico = 'columnas'
  private grafico: Grafico
  private constructor() { }

  static get instance() {
    return EchartsPropsMapper._instance
  }
  public map(grafico: Grafico): EChartsReactProps {
    this.grafico = grafico;
    const props: EChartsReactProps = {
      option: {
        title: {
          text: grafico.titulo
        },
        xAxis: this.getXAxisConfig(),
        yAxis: this.getYAxisConfig(),
        series: this.getSeries()
      }
    }
    return deepAssign({}, ECHATS_DEFALT_PROPS, props)
  }
  private getSeries(): echarts.EChartOption.Series[] {
    const rawSeries = this.grafico.series || [];
    return rawSeries.map((serie) => {
      return {
        ...this.getTypeProps(serie),
        name: serie.nombre,
        data: serie.valores,
      }
    })
  }
  private getTypeProps(serie: Serie): echarts.EChartOption.Series {
    const tipo = serie.tipo || this.grafico.tipo || this.tipoGraficoDefecto;
    const props = TIPO_SERIE_TO_ECHARS_SERIE_TYPE[tipo];
    if (props) {
      return props;
    }
    return {
      type: 'column'
    };
  }
  private getXAxisConfig(): echarts.EChartOption.XAxis {
    const main: echarts.EChartOption.XAxis = {
      type: this.getXAxisType(),
    }
    if (main.type === 'category') {
      main.data = this.grafico.categorias;
    }
    return main;
  }
  private getYAxisConfig(): echarts.EChartOption.YAxis {
    const main: echarts.EChartOption.YAxis = {
      type: this.getYAxisType(),
    }
    if (main.type === 'category') {
      main.data = this.grafico.categorias;
    }
    return main;
  }
  private getXAxisType(): 'category' | 'value' {
    if (this.grafico.tipo === 'barras') {
      return 'value';
    }
    return 'category';
  }
  private getYAxisType(): 'value' | 'category' {
    if (this.grafico.tipo === 'barras') {
      return 'category';
    }
    return 'value';
  }
}

export default EchartsPropsMapper.instance
