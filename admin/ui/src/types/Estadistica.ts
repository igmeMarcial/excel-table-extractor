import { ConfigPubEstadistica } from './ConfigPubEstadistica';
import { EstadisticaDatos } from './EstadisticaDatos';

export interface EstadisticaBaseFields {
  id?: number;
  componenteId?: number;
  subcomponenteId?: number;
  temaEstadisticoId?: number;
}
export interface FichaTecnicaFields {
  nombre?: string;
  finalidad?: string;
  descripcion?: string;
  unidadMedida?: string;
  formulaCalculo?: string;
  metodologiaCalculo?: string;
  fuente?: string;
  unidadOrganicaGeneradora?: string;
  url?: string;
  periodicidadGeneracion?: string;
  periodicidadEntrega?: string;
  periodoSerieTiempo?: string;
  ambitoGeografico?: string;
  limitaciones?: string;
  relacionObjetivosNacionales?: string;
  relacionIniciativasInternacionales?: string;
  correoElectronico?: string;
  datosContacto?: string;
  telefonoCelular?: string;
}

export interface Estadistica
  extends EstadisticaBaseFields,
  FichaTecnicaFields {
  datos?: EstadisticaDatos;
  parametrosPublicacion?: any;
}
