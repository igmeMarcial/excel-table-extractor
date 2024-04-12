import { getChartColors } from "./colors";

const colors = getChartColors();

export const serieColor = (index: number) => {
  return colors[index % colors.length];
};
