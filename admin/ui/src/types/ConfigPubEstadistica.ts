import { ConfigGrafico } from "./ConfigGrafico";
// Configuración de publicación de estadística
export interface ConfigPubEstadistica {
  defaults: {
    configGrafico: ConfigGrafico;
  };
  graficos: ConfigGrafico[];
}
