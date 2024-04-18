import { Cell } from "./Cell";
import { FormatoTabla } from "./FormatoTabla";

export interface EstadisticaDatos {
  tabla?: Cell[][];
  titulo?: string;
  nota?: string;
  fuente?: string;
  elaboracion?: string;
  formato?: FormatoTabla;
}
