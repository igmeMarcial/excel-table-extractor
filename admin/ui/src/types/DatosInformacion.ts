import { RangoCeldas } from "./RangoCeldas";
import { RecomendacionGrafica } from "./RecomendacionGrafica";

export interface DatosInformacion {
  tieneFilaTotales?: boolean;
  tieneCeldasCombinadas?: boolean;
  recomendacionGrafica?: RecomendacionGrafica;
  valoresRango?: RangoCeldas;
}
