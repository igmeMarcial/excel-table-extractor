import { GraficoProsBase } from "./GraficoPropsBase";
import { TipoGrafico } from "./TipoGrafico";
export interface Grafico extends GraficoProsBase {
  id: number;
  tipo?: TipoGrafico;
  titulo?: string;
  subtitulo?: string;
  rotacionEtiquetasCategorias?: number;
  mostrarLeyenda?: boolean;
  mostrarEtiquetas?: boolean;
  numeroDecimalesEtiquetas?: number;
  fuente?: string;
}
