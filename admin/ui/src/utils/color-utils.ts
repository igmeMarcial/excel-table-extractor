import { COLORES_MDEA, COLORES_OCDE, COLORES_ODS, COLORES_PNA } from "../config/colors";
import { CodigoMarcoOrdenador } from "../types/CodigoMarcoOrdenador";

export const getContextoVisualColor = (contextoVisual: CodigoMarcoOrdenador, index: number) => {
  switch (contextoVisual) {
    case 'mdea':
      return COLORES_MDEA[index];
    case 'ods':
      return COLORES_ODS[index];
    case 'ocde':
      return COLORES_OCDE[index];
    case 'pna':
      return COLORES_PNA[index];
    default:
      return COLORES_MDEA[index];
  }
}
