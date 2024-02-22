import { ConfigPubEstadistica } from "../types/ConfigPubEstadistica";

export const DEFAULT_ESTADISTICA_PUBLISH_SETTINGS: ConfigPubEstadistica = {
  defaults: {
    configGrafico: {
      tipoGrafico: "line",
    },
  },
  graficos: [{}],
};
