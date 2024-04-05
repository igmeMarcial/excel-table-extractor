import { CellRange } from "./CellRange";
import { RecomendacionGrafica } from "./RecomendacionGrafica";

export interface DatosInformacion {
  sonDatosAnualesPorDepartamento?: boolean;
  sonDepartamentosTest?:boolean,//borrar
  tieneFilaTotales?: boolean;
  tieneCeldasCombinadas?: boolean;
  recomendacionGrafica?: RecomendacionGrafica;
  valoresRango?: CellRange;
}
