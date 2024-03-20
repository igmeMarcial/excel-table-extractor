import { TipoSerie } from "./TipoSerie";

export interface Serie {
  nombre: string;
  tipo?: TipoSerie;
  valores: number[];
  mostrarEtiquetas?: boolean;
  numeroDecimalesEtiquetas?: number;
}
