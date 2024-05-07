import { Orientation } from "./Orientation";

export interface ReferenciasTablaDatos {
  rangoValores: string;    // Rango en formato A1
  rangoCategorias: string; // Rango en formato A1
  rangoSeries: string;     // Rango en formato A1
  orientacionSeries: Orientation
}
