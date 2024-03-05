import { Serie } from "./Serie";
import { TipoGrafico } from "./TipoGrafico";

export interface Grafico {
  tipo?: TipoGrafico;
  titulo?: string;
  series?: Serie[];
  categorias?: string[];
}
