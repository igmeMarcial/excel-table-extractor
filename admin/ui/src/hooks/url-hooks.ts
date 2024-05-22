import { useLocation } from "react-router-dom";
import { MARCO_ORDENADOR_DEFECTO, QUERY_PARAM_ESTADISTICA_DATA_TAB, QUERY_PARAM_MARCO_ORDENADOR } from "../core/constantes";
import { getQueryParam } from "../utils/url-utils";

// Devuelve el marco ordenador la la url
export const useMarcoOrdenadorParam = () => {
  const location = useLocation();
  return getQueryParam(location, QUERY_PARAM_MARCO_ORDENADOR, MARCO_ORDENADOR_DEFECTO);
}
// Devuelve el tab seleccionado de la información de la estadistica que se muestra al usuario
// Gráfico, Datos, Ficha técnica
export const useEstadisticaDataViewParam = () => {
  const location = useLocation();
  return getQueryParam(location, QUERY_PARAM_ESTADISTICA_DATA_TAB, 'grafico');
}
