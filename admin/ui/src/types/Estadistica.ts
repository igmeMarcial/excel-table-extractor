import { Grafico } from './Grafico'
import { DatosInformacion } from './DatosInformacion'
import { EstadisticaDatos } from './EstadisticaDatos'
import { PresentacionTabla } from './PresentacionTabla'

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
}

export interface Estadistica
  extends EstadisticaBaseFields,
  FichaTecnicaFields {
  datos?: EstadisticaDatos
  datosInformacion?: DatosInformacion
  graficos?: Grafico[]
  presentacionTabla?: PresentacionTabla
}
