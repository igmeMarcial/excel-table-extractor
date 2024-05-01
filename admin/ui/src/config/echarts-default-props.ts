import { EChartsReactProps } from "echarts-for-react";
import { getChartColors } from "../utils/colors";
import { DT_GRAFICO_FONT_SIZE } from "./design-tokens";

export const ECHATS_DEFALT_PROPS: EChartsReactProps = {
  style: {
    height: 400,
  },
  option: {
    color: getChartColors(),
    grid: {
      left: 0,
      right: 0,
      top: 60,
      bottom: 20,
      containLabel: true,
    },
/*     toolbox: {
      right: 8,
      top: 8,
      feature: {
        dataZoom: {
          yAxisIndex: "none"
        },
        magicType: {
          type: ["line", "bar", "stack", "tiled"]
        },
        saveAsImage: {}
      }
    }, */
    title: {
      left: 'left',
      textStyle: {
        fontSize: DT_GRAFICO_FONT_SIZE,
        overflow: 'break',
        width: 500,
      },
      padding: [8, 0],
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0, // Show all labels
        fontSize: DT_GRAFICO_FONT_SIZE,
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        interval: 0, // Show all labels
        fontSize: DT_GRAFICO_FONT_SIZE,
      }
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      bottom: 8,
    },
  }
};

export const ECHART_SERIES_DEFAULT_PROPS: echarts.EChartOption.Series = {
  type: 'line',
  label: {
    show: true,
    position: 'top',
    fontSize: DT_GRAFICO_FONT_SIZE,
  }
};
