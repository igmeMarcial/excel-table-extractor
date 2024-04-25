import { ValidationErrors } from "../core/Validators";
import { Estadistica } from "./Estadistica";
import { FieldValidation } from "./FieldValidation";
import { RecomendacionGrafica } from "./RecomendacionGrafica";

export interface EstadisticaFormState {
  // Indicar si hay cambios en el formulario
  hasChanges: boolean;
  isCreationMode: boolean;
  titulo: string;
  estadisticaModel: Estadistica;
  estadisticaRawModel: Estadistica;
  activeTab: string;
  recomendacionGrafica?: RecomendacionGrafica;
  tienePresentacionGraficaPersonalizada?: boolean;
  validations?: Record<string, FieldValidation>;
  validationErrors?: Record<string, ValidationErrors>;
}
