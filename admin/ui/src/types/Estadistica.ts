import { ConfigPubEstadistica } from './ConfigPubEstadistica';
import { TablaDatos } from './TablaDatos';

export interface EstadisticaBaseFields {
  id?: number;
  componenteId?: number;
  subcomponenteId?: number;
  temaEstadisticoId?: number;
}
export interface FichaTecnicaFields {
  nombre?: string;
  finalidad?: string;
  descripcionDefinicion?: string;
  unidadDeMedida?: string;
  formulaCalculo?: string;
  metodologiaCalculo?: string;
  fuente?: string;
  unidadOrganicaGeneradora?: string;
  url?: string;
  periodicidadGeneracion?: string;
  periodicidadEntregaRegistro?: string;
  periodoSerieTiempo?: string;
  ambitoGeografico?: string;
  limitaciones?: string;
  relacionObjetivos?: string;
  relacionIniciativasInternacionales?: string;
  correoElectronico?: string;
  datosContacto?: string;
  telefonoCelular?: string;
}

export interface Estadistica
  extends EstadisticaBaseFields,
  FichaTecnicaFields {
  tablaDatos?: TablaDatos;
  configPublicacion?: ConfigPubEstadistica;
}
