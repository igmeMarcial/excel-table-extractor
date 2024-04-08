import { Serie } from "./Serie";
import { TipoGrafico } from "./TipoGrafico";

export interface Grafico {
  tipo?: TipoGrafico;
  titulo?: string;
  series?: Serie[];
  categorias?: string[];
  rotacionEtiquetasCategorias?: number;
  mostrarLeyenda?: boolean;
  mostrarEtiquetas?: boolean;
  numeroDecimalesEtiquetas?: number;
  referenciasTablaDatos?: {
    rangoValores: string;
    rangoCategorias: string;
    rangoSeries: string;
  };
}
