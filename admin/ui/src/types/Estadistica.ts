import { Grafico } from './Grafico'
import { DatosInformacion } from './DatosInformacion'
import { Cell } from './Cell'
import { FormatoTabla } from './FormatoTabla';

export interface EstadisticaBaseFields {
  id?: number;
  clasificadorN1Id?: number
  clasificadorN2Id?: number
  clasificadorN3Id?: number
}

export interface FichaTecnicaFields {
  nombre?: string
  finalidad?: string
  descripcion?: string
  unidadMedida?: string
  formulaCalculo?: string
  metodologiaCalculo?: string
  fuente?: string
  unidadOrganicaGeneradora?: string
  url?: string
  periodicidadGeneracion?: string
  periodicidadEntrega?: string
  periodoSerieTiempo?: string
  ambitoGeografico?: string
  limitaciones?: string
  relacionObjetivosNacionales?: string
  relacionIniciativasInternacionales?: string
  correoElectronico?: string
  datosContacto?: string
  telefonoCelular?: string
  clasificacionMdea?: string
  clasificacionOds?: string
  clasificacionOcde?: string
  clasificacionPna?: string
  //Estados
  activo?: boolean
  vigente?: boolean
}

export interface Estadistica extends EstadisticaBaseFields, FichaTecnicaFields {
  datos?: Cell[][]
  datosInformacion?: DatosInformacion
  graficos?: Grafico[]
  // Presentacion
  presentacionTablaTitulo?: string
  presentacionTablaSubtitulo?: string
  presentacionTablaNota?: string
  presentacionTablaFuente?: string
  presentacionTablaElaboracion?: string
  presentacionTablaFormato?: FormatoTabla
  fechaMod?: string
}
