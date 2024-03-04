import { Serie } from "./Serie";
import { TipoGrafico } from "./TipoGrafico";

export interface Grafico {
  tipoGrafico?: TipoGrafico;
  titulo?: string;
  series?: Serie[];
  categorias?: string[];
}
