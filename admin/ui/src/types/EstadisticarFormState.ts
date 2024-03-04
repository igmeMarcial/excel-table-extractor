import { EChartsReactProps } from "echarts-for-react";
import { Estadistica } from "./Estadistica";
import { RecomendacionGrafica } from "./RecomendacionGrafica";

export interface EstadisticaFormState {
  // Indicar si hay cambios en el formulario
  hasChanges: boolean;
  isCreationMode: boolean;
  titulo: string;
  estadisticaModel: Estadistica;
  estadisticaRawModel: Estadistica;
  activeTab: string;
  echartDefaultProps: EChartsReactProps;
  recomendacionGrafica?: RecomendacionGrafica;
  tienePresentacionGraficaPersonalizada?: boolean;
}
