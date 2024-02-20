export interface EstadisticaModel {
  id?: number;
  componenteId?: number;
  subcomponenteId?: number;
  nombre?: string;
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
