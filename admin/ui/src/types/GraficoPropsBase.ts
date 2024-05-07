import { ReferenciasTablaDatos } from "./ReferenciasTablaDatos";
import { Serie } from "./Serie";

export interface GraficoProsBase {
  series: Serie[];
  categorias: string[];
  referenciasTablaDatos?: ReferenciasTablaDatos;
}
