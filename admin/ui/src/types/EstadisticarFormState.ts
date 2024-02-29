import { ConfigGrafico } from "./ConfigGrafico";
import { Estadistica } from "./Estadistica";

export interface EstadisticaFormState {
  // Indicar si hay cambios en el formulario
  hasChanges: boolean;
  isCreationMode: boolean;
  titulo: string;
  estadisticaModel: Estadistica;
  estadisticaRawModel: Estadistica;
  parametrosPublicacionDefecto: {
    configGrafico: ConfigGrafico;
  };
  activeTab: string;
}
