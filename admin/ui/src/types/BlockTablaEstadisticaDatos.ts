import { Cell } from "./Cell";
import { FormatoTabla } from "./FormatoTabla";

export interface BlockTablaEstadisticaDatos {
  nombre: string;
  unidadMedida: string;
  periodoSerieTiempo: string;
  presentacionTablaTitulo: string;
  presentacionTablaSubtitulo: string;
  presentacionTablaFuente: string;
  presentacionTablaNota: string;
  presentacionTablaElaboracion: string;
  datos: Cell[][];
  presentacionTablaFormato: FormatoTabla
}
