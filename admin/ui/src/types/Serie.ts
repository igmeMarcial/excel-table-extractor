import { TipoSerie } from "./TipoSerie";

export interface Serie {
  nombre: string;
  tipo?: TipoSerie;
  valores: number[];
  color?: string;
  mostrarEtiquetas?: boolean;
  numeroDecimalesEtiquetas?: number;
}
