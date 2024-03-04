import { DataCell } from "./DataCell";

export interface EstadisticaDatos {
  tabla?: DataCell[][];
  nombre?: string;
  nota?: string;
  fuente?: string;
  elaboracion?: string;
}
