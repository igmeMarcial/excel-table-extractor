import { EChartsReactProps } from "echarts-for-react";

export const ECHATS_DEFALT_PROPS: EChartsReactProps = {
  style: {
    height: 400,
  },
  option: {
    toolbox: {
      right: 8,
      top: 8,
      feature: {
        dataZoom: {
          yAxisIndex: "none"
        },
/*         dataView: {
          readOnly: true
        }, */
        magicType: {
          type: ["line", "bar", "stack", "tiled"]
        },
        saveAsImage: {}
      }
    },
    title: {
      left: 'center',
      textStyle: {
        fontSize: '12px'
      }
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      bottom: 8,
    },
  }
};
